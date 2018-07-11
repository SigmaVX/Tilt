var mongoose = require("mongoose");

// reference to Schema constructor
var Schema = mongoose.Schema;

// create a new NoteSchema object using the Schema constructor
var ChatSchema = new Schema({
  "chat": String,
  "postedBy": { 
    type: String, 
    required: false 
  },
  date: { 
    type: Date,
    default: Date.now()
  }
});

// creates model from NoteSchema using mongoose's model method
var Chats = mongoose.model("Chats", ChatSchema);

// Export the Note model
module.exports = Chats;