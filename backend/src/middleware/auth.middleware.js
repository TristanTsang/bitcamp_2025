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

    const { uid } = decodedToken;
    const user = await User.findOneAndUpdate(
      { uid },
      { $setOnInsert: { uid } },
      { new: true, upsert: true }
    );
    console.log(user);

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Internal Service Issue" });
  }
};
