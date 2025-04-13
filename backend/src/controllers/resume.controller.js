import Resume from "../models/resume.model.js";
import cloudinary from "../lib/cloudinary.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { GEMINI_PROMPT } from "../lib/constants.js";
import multer from "multer";

dotenv.config();
export const uploadResume = async (req, res) => {
  try {
    const { resumeFile } = req.body;
    const userId = req.user.uid;

    let resumeUrl;
    if (!resumeFile) {
      return res.status(404).json({ message: "No File Provided" });
    }

    // Extract only the base64 string from the Data URL
    const base64Data = resumeFile.replace(/^data:application\/pdf;base64,/, "");

    // Convert it to a buffer (used for Gemini or other processing)
    const pdfBuffer = Buffer.from(base64Data, "base64");

    //Upload resume to cloudinary
    if (resumeFile) {
      const uploadResponse = await cloudinary.uploader.upload(resumeFile);
      resumeUrl = uploadResponse.secure_url;
    }

    if (!resumeUrl) {
      return res.status(404).json({ message: "File Upload Failed" });
    }

    // Gemini analysis
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = GEMINI_PROMPT;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: pdfBuffer.toString("base64"),
          mimeType: "application/pdf",
        },
      },
    ]);

    let text = await result.response.text();
    text = text.trim();

    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    const jsonString = text.substring(firstBrace, lastBrace + 1);

    let structuredData;
    try {
      structuredData = JSON.parse(jsonString);
    } catch (err) {
      console.error("Gemini JSON parse error:", err.message);
      return res.status(500).json({
        error: "Failed to parse structured feedback from Gemini.",
      });
    }

    console.log(structuredData);

    const newResume = new Resume({
      uid: userId,
      username: req.user.username,
      analysis: structuredData,
      elo: structuredData.score,
      resume: resumeUrl,
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
