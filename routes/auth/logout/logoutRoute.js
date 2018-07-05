const router = require("express").Router();
// const dbController = require("../../controllers/userController");

// For "/logout"
router
  .route("/")
  .get(function (req, res) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) throw err;

        return res.redirect("/");
      });
    }
  });

module.exports = router;