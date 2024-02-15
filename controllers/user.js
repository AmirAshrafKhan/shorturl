const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth.js");

async function handleUserSignuP(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "invalid username or password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handleUserSignuP,
  handleLogin,
};
