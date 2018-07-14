const router = require("express").Router();
const dbController = require("../../../controllers/userController");

// For "/auth/signup"
router
  .route("/")
//  .get(function(req, res) {dbController.findAll(req, res);})
  .post(function(req, res) {dbController.create(req, res);})


// For "/auth/signup/:id"
router
  .route("/:id")
//  .get(function(req, res) {dbController.findById(req, res);})
  .put(function(req, res) {dbController.update(req, res);})
//  .delete(function(req, res) {dbController.remove(req, res);});

module.exports = router;