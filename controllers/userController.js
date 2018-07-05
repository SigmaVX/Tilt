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
          return res.redirect('/signup');          
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
            res.json(user);
            // return res.redirect('/home');
          }
        });
    }
    else {
      res.status(404).send("Incorrect email/password");
    }
  } 

};

/*     console.log(`in login user: ${req.body.email}`);
    Users
    .findOne({ email: req.body.email })
    .exec(function (err, user) {
      if (err) throw err;
      else if (!user) {
        // var err = new Error("User not found.");
        // err.status = 401;
        res.status(401).send("User not found");
      }
      console.log(`after findOne function: ${user.username} ${user.password} req.password: ${req.body.password}`);
      let pwString; */
      // = bcrypt.hash(req.body.password, 10);
      // pwString = hash;


/*         let hash = bcrypt.hashSync(req.body.password, 10);
        console.log(`hash: ${pwString}`);
        console.log("pwString: ", JSON.stringify(pwString));
        bcrypt.compare(req.body.password, hash,  function (err, result) {
          if (err) throw err;

          if (result === true) {
            res.json(user);
          } else {
            res.json({"login_status": false});
          }
        }); */

/*       bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) return next(err);

        pwString = hash;

        console.log(`pwString: ${pwString}`);
        console.log("pwString: ", JSON.stringify(pwString));
        bcrypt.compare(user.password, pwString,  function (err, result) {
          if (err) throw err;

          if (result === true) {
            res.json(user);
          } else {
            res.json({"login_status": false});
          }
        }) */

   // }); 