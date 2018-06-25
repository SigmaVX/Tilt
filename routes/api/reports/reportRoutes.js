
const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Reports = require("../../../models/Reports");

// For "/api/reports"
router
  .route("/")
  .get(function(req, res) {dbController.findAll("Reports", req, res);})
  .post(function(req, res) {dbController.create(Reports, req, res);});

// For "/api/reports/:id"
router
  .route("/:id")
  .get(dbController.findById)
  .put(dbController.update)
  .delete(dbController.remove);

module.exports = router;

// cheatPost
//  1 post to reports table
//  2 post to games table
//  3 post to systems table
//  4 get from cheaters and then if statement for post or put