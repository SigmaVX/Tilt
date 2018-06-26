
const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Reports = require("../../../models/Reports");

// For "/api/reports"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Reports, req, res);})
  .post(function(req, res) {dbController.create(Reports, req, res);});

// For "/api/reports/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Reports, req, res);})
  .put(function(req, res) {dbController.update(Reports, req, res);})
  .delete(function(req, res) {dbController.remove(Reports, req, res);});

module.exports = router;
