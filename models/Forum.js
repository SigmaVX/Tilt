const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  // perhaps add a Game
  forumText: { 
    type: [String], 
    required: true 
  },
  postedBy: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date,
    default: Date.now()
  }
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;