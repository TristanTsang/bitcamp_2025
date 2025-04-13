import User from "../models/user.model.js";
import admin from "../lib/firebase.js";

export const protectRoute = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized - no token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const { uid, name } = decodedToken;
    let user = await User.findOne({ uid });

    if (!user) {
      const newUser = new User({ uid: uid });
      user = await User.create(newUser);
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Internal Service Issue" });
  }
};
