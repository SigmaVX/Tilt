const router = require("express").Router();
const cheatersRoutes = require("./cheaters/cheatersRoutes");
const forumRoutes = require("./forum/forumRoutes");
const gamesRoutes = require("./games/gamesRoutes");
const reportsRoutes = require("./reports/reportsRoutes");
const systemsRoutes = require("./systems/systemsRoutes");
const usersRoutes = require("./users/usersRoutes");
const videosRoutes = require("./videos/videosRoutes");
const youtubevidsRoutes = require("./youtubevids/youtubevidsRoutes");

router.use("/cheaters", cheatersRoutes);
router.use("/forum", forumRoutes);
router.use("/games", gamesRoutes);
router.use("/reports", reportsRoutes);
router.use("/systems", systemsRoutes);
router.use("/users", usersRoutes);
router.use("/videos", videosRoutes);
router.use("/youtubevids", youtubevidsRoutes);

module.exports = router;