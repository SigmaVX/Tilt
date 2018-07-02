const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Games = require("../../../models/Games");

// For "/api/games"
router
  .route("/")
  .get(function(req, res) {dbController.findAllBySort(Games, req, res, "gameName");})
  .post(function(req, res) {dbController.create(Games, req, res);});

// For "/api/games/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Games, req, res);})
  .put(function(req, res) {dbController.update(Games, req, res);})
  .delete(function(req, res) {dbController.remove(Games, req, res);});

module.exports = router;