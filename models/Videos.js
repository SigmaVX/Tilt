const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videosSchema = new Schema({
  videoLink: { 
    type: String, 
    required: true 
  },
  videoSource: String,
});

const Videos = mongoose.model("Videos", videosSchema);

module.exports = Videos;