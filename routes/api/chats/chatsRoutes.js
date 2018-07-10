const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Chats = require("../../../models/Chat");
const Forum = require("../../../models/Forum");

// For "/api/chats"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Chats, req, res);});
  // .post(function(req, res) {dbController.create(Chats, req, res);});

// For "/api/chats/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Chats, req, res);})
  .post(function(req, res) {dbController.createItem(Chats, Forum, req, res);})
  // .put(function(req, res) {dbController.update(Chats, req, res);})
  .delete(function(req, res) {dbController.removeItemById(Chats, req, res);});

module.exports = router;