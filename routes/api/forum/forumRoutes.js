const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Forum = require("../../../models/Forum");

// For "/api/forum"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Forum, req, res);})
  .post(function(req, res) {dbController.create(Forum, req, res);});

// For "/api/forum/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findByForum(Forum, req, res);})
  .put(function(req, res) {dbController.update(Forum, req, res);})
  .delete(function(req, res) {dbController.removeItemById(Forum, req, res);});

module.exports = router;