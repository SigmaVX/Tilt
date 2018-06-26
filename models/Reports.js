const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportsSchema = new Schema({
  cheaterIGN: { 
    type: String, 
    required: true 
  },
  cheatGame:{
    type: Schema.Types.gameName,
    ref: "Games"
  },
  cheatSystem: {
    type: Schema.Types.systemName,
    ref: "Systems"
  },
  cheatType: { 
    type: String, 
    required: true 
  },
  cheatVideo: { 
    type: String 
  },
  cheatComments: { 
    type: String 
  },    
  date: { 
    type: Date,
    default: Date.now()
  }
});

const Reports = mongoose.model("Reports", reportsSchema);

module.exports = Reports;