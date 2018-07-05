const router = require("express").Router();
const signupRoute = require("./signupRoute");

router.use("/", signupRoute);

module.exports = router;