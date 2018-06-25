const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cheatersSchema = new Schema({
  cheaterIGN: { 
    type: String, 
    required: true 
  },
  cheaterSystem: { 
    type: String, 
    required: true 
  },
  cheatCount: { 
    type: Number,
    default: 0 
  },    
  updatedOn: { 
    type: Date,
    default: Date.now()
  }
});

const Cheaters = mongoose.model("Cheaters", cheatersSchema);

module.exports = Cheaters;