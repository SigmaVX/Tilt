const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  // for now contemplate two games, Fortnite and League of Legends
  forumChatRoom: {
    type: String
  },
  date: { 
    type: Date,
    default: Date.now()
  },
	// `chats` is an array that stores ObjectIds
	// The ref property links these ObjectIds to the Chat model
  // This allows us to populate the Forum schema with any associated Chats,
  // so simulate a chat environment
	"chats": [
		{
			// Store ObjectIds in the array
			type: Schema.Types.ObjectId,
			// The ObjectIds will refer to the ids in the Note model
			ref: "Chats"
		}
	]
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;