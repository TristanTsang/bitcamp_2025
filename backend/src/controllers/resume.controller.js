import Resume from "../models/resume.model.js";

export const uploadResume = async (req, res) => {
  try {
    const { resumeFile } = req.body;
    const userId = req.user.uid;

    //TODO HANDLE RESUME UPLOAD
    /*let resumeUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      resumeUrl = uploadResponse.secure_url;
    } 
    */
    const newResume = new Resume({
      uid: userId,
      analysis: {
        Weaknesses: ["Weakness 1, Weakness 2, Weakness 3"],
        Strengths: ["Strength1", "Strength2"],
      },
      parsedData: {
        Education: ["UMD"],
        Experiences: ["Software Engineer"],
      },
      elo: -500,
      resume: resumeFile,
    });

    await newResume.save();

    res.status(201).json(newResume);
  } catch (error) {
    console.log("Error in uploadResume controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const userId = req.user.uid;
    const resumes = await Resume.find({ uid: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error in getUserResumes: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ elo: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error in getAllResumes: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
