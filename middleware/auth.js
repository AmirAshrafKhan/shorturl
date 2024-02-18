// const { getUser } = require("../service/auth.js");

// function checkForuthentication(req, res, next) {
//   const tokenCookie = req.cookies?.token;
//   req.user = null;
//   if (!tokenCookie) return next();

//   const token = tokenCookie;
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

// function restrictTo(roles = []) {
//   return function (req, res, next) {
//     if (!req.user) res.redirect("login");
//     if (!roles.includes(req.res.role)) return res.end("unauthorized");
//     return next();
//   };
// }
// module.exports = {
//   checkForuthentication,
//   restrictTo,
// };

const { getUser } = require("../service/auth.js");

function checkForuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login"); // Redirect to login if user is not authenticated
    if (!roles.includes(req.user.role)) return res.end("Unauthorized"); // Check if user's role is allowed
    return next();
  };
}

module.exports = {
  checkForuthentication,
  restrictTo,
};
