const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // 1. Get header
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Extract token from "Bearer TOKEN"
    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // 3. Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user id to request
    req.user = { _id: decoded.id };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
