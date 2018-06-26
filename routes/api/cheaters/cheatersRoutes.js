const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Cheaters = require("../../../models/Cheaters");

// For "/api/cheaters"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Cheaters, req, res);})
  .post(function(req, res) {dbController.create(Cheaters, req, res);});

// For "/api/cheaters/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Cheaters, req, res);})
  .put(function(req, res) {dbController.update(Cheaters, req, res);})
  .delete(function(req, res) {dbController.remove(Cheaters, req, res);});

module.exports = router;