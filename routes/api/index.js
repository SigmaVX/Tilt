const router = require("express").Router();
const reportRoutes = require("./reports/reportRoutes");

router.use("/reports", reportRoutes);

module.exports = router;