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
usersSchema.statics.authenticate = function (username, password, callback) {
// usersSchema.authenticate = function (email, password, callback) {
  Users
    .findOne({ username: username })
    .exec(function (err, user) {
      if (err) throw err;

      if (!user) {
        // "User not found in database."
        return callback(null, null);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) throw err;

        return (result === true) ? callback(null, user) : callback();
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
