const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const systemsSchema = new Schema({
  systemName: { 
    type: String, 
    required: true 
  },
  systemImage: { 
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

const Systems = mongoose.model("Systems", systemsSchema);

module.exports = Systems;