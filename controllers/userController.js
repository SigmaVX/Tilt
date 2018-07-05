// require("../models");
// const bcrypt = require("bcrypt");
const Users = require("../models/Users");

// Defining database methods for the Tilt's User table
module.exports = {
  findAll: function (req, res) {
    Users
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {
    if (req.body.email && req.body.username && req.body.password && req.body.pswrdConfirmation &&
        (req.body.password === req.body.pswrdConfirmation)) {
      let userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      }
      //use schema.create to insert data into the db 
      Users
        .create(userData, function (err, user) {
          if (err) throw err;

          req.session.userId = user._id;
          req.session.username = user.username;
          req.session.userType = user.userType;
          res.json(req.session);          
        });
    }
    else {
      res.status(404).send("Signup not successful.");
    }
  },

  findOne: function(req, res) {
    if (req.body.username && req.body.password) {
      Users
        .authenticate(req.body.username, req.body.password, function (err, user) {
          if (err) {
            console.log(err);
            res.status(404).send("Incorrect username/password");
          } 
          
          if (!user) {
            res.status(404).send("Incorrect username/password");
          } else {
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.email = user.email;
            res.json({
              isLoggedIn: true,
              userId: req.session.userId,
              username: req.session.username,
              email: req.session.email
            });
          }
        });
    }
    else {
      res.status(404).send("Incorrect username/password");
    }
  },

  findById: function (req, res) {
    Users
      .findById(req.session.userId)
      .then(dbModel => {
        // if user was not found send back false
        if (!dbModel) res.json({isLoggedIn: false});

        // means user is signed in already send back true
        res.json({
          isLoggedIn: true,
          userId: req.session.userId,
          username: req.session.username,
          email: req.session.email
        });
      })
      .catch(err => res.status(422).json(err));
  },

  isAdmin: function (req, res) {
    Users
      .findById(req.session.userId)
      .then(dbModel => {
        // if user was not found send back false
        if (!dbModel) res.json({isAdmin: false});

        // check if active session user is an administrator
        if (dbModel.userType === "admin")
          res.json({isAdmin: true});
        else if (dbModel.userType === "user")
          res.json({isAdmin: false});
        else 
          // user not of recognized type, possible db breach
          res.status(422).end();
      })
      .catch(err => res.status(422).json(err));
  },

  update: function (req, res) {
    Users
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    Users
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  } 

};