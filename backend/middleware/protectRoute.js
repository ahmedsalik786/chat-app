// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) {
//       res.status(401).json({ error: "unauthorised - no token provided" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     if (!decoded) {
//       res.status(401).json({ error: "unauthorised - invalid token" });
//     }

//     const user = await User.findOne(decoded.userId).select("-password");
//     if (!user) {
//       res.status(404).json({ error: "user not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("error in protectRoute middleware: ", error);
//     res.status(500).json({ error: "internal server error" });
//   }
// };

// export default protectRoute;

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "unauthorised - no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ _id: decoded.userId }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "unauthorised - invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "unauthorised - token expired" });
    }
    console.log("error in protectRoute middleware: ", error);
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectRoute;
