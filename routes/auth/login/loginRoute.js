const router = require("express").Router();
const dbController = require("../../../controllers/userController");

// For "/login"
router
  .route("/")
  .get(function(req, res) {dbController.findById(req, res);})
  .post(function(req, res) {dbController.findOne(req, res);})

module.exports = router;