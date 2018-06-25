const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  gameName: { 
    type: String, 
    required: true 
  },
  gameImage: { 
    type: String, 
    required: true 
  },
  cheatCount: { 
    type: Number,
    default: 0, 
    required: true 
  },    
  addedOnDate: { 
    type: Date,
    default: Date.now()
  }
});

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;