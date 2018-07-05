const router = require("express").Router();

const signupRoute = require("./signup/signupRoute");
const loginRoute = require("./login/loginRoute");
const logoutRoute = require("./logout/logoutRoute");

router.use("/signup", signupRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);

module.exports = router;