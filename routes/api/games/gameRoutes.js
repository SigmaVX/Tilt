const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Game = require("../../../models/Game");

// For "/api/game"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Game, req, res);})
  .post(function(req, res) {dbController.create(Game, req, res);});

// For "/api/game/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Game, req, res);})
  .put(function(req, res) {dbController.update(Game, req, res);})
  .delete(function(req, res) {dbController.remove(Game, req, res);});

module.exports = router;