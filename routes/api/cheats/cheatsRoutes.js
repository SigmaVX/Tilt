const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Cheats = require("../../../models/Cheats");

// For "/api/cheats"
router
  .route("/")
  .get(function(req, res) {dbController.findAllBySort(Cheats, req, res, "cheatName");})
  .post(function(req, res) {dbController.create(Cheats, req, res);});

// For "/api/cheats/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Cheats, req, res);})
  .put(function(req, res) {dbController.update(Cheats, req, res);})
  .delete(function(req, res) {dbController.remove(Cheats, req, res);});

module.exports = router;