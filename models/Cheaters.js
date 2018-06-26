const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cheatersSchema = new Schema({
  cheaterIGNFTS: { 
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

// IGNFTS = In Game Name For The System (e.g. John Doe Xbox Gamertag or John Doe PSN ID)