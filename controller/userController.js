// let database = require("../database");
// let authenticate = require("../passportStarterCode/middleware/checkAuth");
// let passport = require("../passportStarterCode/middleware/passport")


// let authController = {
//   login: (req, res) => {
//     res.render("auth/login");
//   },

//   register: (req, res) => {
//     res.render("auth/register");
//   },

//   loginSubmit: (req, res) => {
//     passport.serializeUser(req)
//   },

//   registerSubmit: (req, res) => {
//     // implement
//   },
// };

// module.exports = authController;

const userModel = require("../database.js").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
