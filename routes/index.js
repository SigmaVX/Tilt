const router = require("express").Router();
const apiRoutes = require("./api");
const signupRoute = require("./signup");
const loginRoute = require("./login");

router.use("/api", apiRoutes);
router.use("/signup", signupRoute);
router.use("/login", loginRoute);

module.exports = router;