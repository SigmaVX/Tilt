const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cheatsSchema = new Schema({
  cheatName: { 
    type: String, 
    required: true 
  },
  cheatImage: { 
    type: String, 
    required: true 
  },
  cheatCount: { 
    type: Number,
    default: 0, 
    required: true 
  },
  cheatDescription: { 
    type: String,
    required: true 
  },      
  addedOnDate: { 
    type: Date,
    default: Date.now()
  }
});

const Cheats = mongoose.model("Cheats", cheatsSchema);

module.exports = Cheats;