const express = require("express");
const { handleUserSignuP, handleLogin } = require("../controllers/user.js");

const router = express.Router();

router.post("/", handleUserSignuP);
router.post("/login", handleLogin);

module.exports = router;
