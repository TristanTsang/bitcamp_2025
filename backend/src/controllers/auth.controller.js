import User from "../models/user.model.js";
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//TODO
export const logout = async (req, res) => {
  return res.status(201).json({ message: "Signup" });
};
//TODO
export const updateJobInterests = async (req, res) => {
  return res.status(201).json({ message: "Job Interests" });
};

//TODO
export const updateProfilePic = async (req, res) => {
  return res.status(201).json({ message: "Signup" });
};

export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user._id;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: username },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
