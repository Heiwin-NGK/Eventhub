const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("Middleware reached");

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      
      console.log("Token:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("Decoded:", decoded);

      const user = await User.findById(decoded.id)
  .select("-password");

      console.log("Found User:", user);

      req.user = user;

      return next();
    }

    return res.status(401).json({
      message: "Not authorized",
    });

  } catch (error) {
    console.log("Middleware Error:", error);
    return res.status(401).json({
      message: "Token failed",
    });
  }
};

module.exports = { protect };