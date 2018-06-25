const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  videoLink: { 
    type: String, 
    required: true 
  },
  videoType: String,
});

const Videos = mongoose.model("Videos", videosSchema);

module.exports = Videos;