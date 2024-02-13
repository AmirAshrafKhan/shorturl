const express = require("express");
const { handleGenerateShortUrl, handleGetAnalytics } = require("../controllers/url.js");
const router = express.Router();

router.post("/", handleGenerateShortUrl);


router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router;
