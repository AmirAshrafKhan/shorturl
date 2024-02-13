const express = require("express");
const { handleGenerateShortUrl } = require("../controllers/url.js");
const router = express.Router();

router.post("/", handleGenerateShortUrl);

module.exports = router;
