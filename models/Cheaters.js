const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cheatersSchema = new Schema({
  cheaterIGNWS: { 
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

// IGNWS = In Game Name With System (e.g. John Doe Xbox Gamertag or John Doe PSN ID)