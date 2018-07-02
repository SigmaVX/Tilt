const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videosSchema = new Schema({
  videoLink: { 
    type: String, 
    required: true 
  },
  videoSource: { 
    type: String, 
    required: true 
  },
  createdOn: { 
    type: Date,
  }
});

const Videos = mongoose.model("Videos", videosSchema);

module.exports = Videos;