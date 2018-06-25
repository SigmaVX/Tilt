const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cheatsSchema = new Schema({
  cheaterNameAndSystem: { 
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