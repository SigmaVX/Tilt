require("../models");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");


// Defining methods for the Tilt's Tables' Controllers
module.exports = {
  findAll: function (req, res) {
    Users
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    if (req.body.email && req.body.username && req.body.password && req.body.pswrdConfirmation) {
      let userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        pswrdConfirmation: req.body.pswrdConfirmation,
      }
      //use schema.create to insert data into the db 
      Users
        .create(userData, function (err, user) {
          if (err) throw err;

          req.session.userId = user._id;
          req.session.username = user.username;
          req.session.userType = user.userType;
          res.redirect("/");          
        });
    }
    else {
      res.status(404).send("Signup not successful.");
    }
  },
  findOne: function(req, res) {
    console.log(`in findOne function: ${req.body.email} ${req.body.password} req.password: ${req.body.password}`);
    if (req.body.email && req.body.password) {
      Users
        .authenticate(req.body.email, req.body.password, function (err, user) {
          if (err) throw err;
          
          if (!user) {
            res.status(404).send("Incorrect email/password");
          } else {
            req.session.userId = user._id;
            // res.json(user);
            res.redirect("/");
          }
        });
    }
    else {
      res.status(404).send("Incorrect email/password");
    }
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