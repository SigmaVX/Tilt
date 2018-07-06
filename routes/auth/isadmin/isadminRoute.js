const router = require("express").Router();
const dbController = require("../../../controllers/userController");

// For "/isadmin"
router
  .route("/")
  .get(function(req, res) {dbController.isAdmin(req, res);})
//  .post(function(req, res) {dbController.findOne(req, res);})

// For "/login/:id"
// router
//  .route("/:id")
//  .get(function(req, res) {dbController.findById(req, res);})
//  .put(function(req, res) {dbController.update(req, res);})
//  .delete(function(req, res) {dbController.remove(req, res);});

module.exports = router;