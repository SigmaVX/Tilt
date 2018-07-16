const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let Schema = mongoose.Schema;

let usersSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default: "user",
    required: true,
  },
  addedOnDate: { 
    type: Date,
    default: Date.now()
  }
});

// authenticate method on Users collection
// authenticate user login input against database
usersSchema.statics.authenticate = function (username, password, cb) {
// usersSchema.authenticate = function (email, password, callback) {
  Users
    .findOne({ username: username })
    .exec(function (err, user) {
      if (err) return cb(err);

      if (!user) {
        // "User not found in database."
        let err = new Error('User not found.');
        // err.status = 401;
        return cb(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log(err);
          cb(err,null);
        }
        // First CB tern is err and 2nd is user info
        return (result) ? cb(null, user) : cb(err, null);
      })
    });
}

// Source: https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
//hash a password before saving it to users database
usersSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    
    user.password = hash;
    next();
  })
});


let Users = mongoose.model("Users", usersSchema);

module.exports = Users;
