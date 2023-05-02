const { User } = require("../models/user");

const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { contactId } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(contactId);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    // console.log(`Token: ${token}`);
    // console.log(`Decoded token: ${JSON.stringify(jwt.decode(token))}`);
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
