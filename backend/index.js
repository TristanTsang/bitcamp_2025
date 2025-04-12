import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';

dotenv.config();

const app = express();
const port = 3000;


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


app.post('/api/review-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a resume PDF file.' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are allowed.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' }); 
    const prompt = `You are a professional resume reviewer. Review this resume and provide detailed feedback, strengths, and areas for improvement. Also rank the resume from 0-100 and be extremely extremely brutal. Only really good to almost perfect resumes should get above a 90.`;

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: 'application/pdf',
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    res.json({ feedback: text });
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Something went wrong while reviewing the resume.' });
  }
});

app.post('/api/compare-resumes', upload.fields([{ name: 'resume1', maxCount: 1 }, { name: 'resume2', maxCount: 1 }]), async (req, res) => {
    try {
      if (!req.files?.resume1 || !req.files?.resume2) {
        return res.status(400).json({ error: 'Please upload two resume PDF files.' });
      }
  
      if (req.files.resume1[0].mimetype !== 'application/pdf' || req.files.resume2[0].mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Only PDF files are allowed.' });
      }
  
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `
        You are a professional resume reviewer. Compare the following two resumes and provide detailed feedback on the differences in strengths, weaknesses, and potential improvements. Rank both resumes from 0-100 and explain the reasons for the differences.
      `;
  
      const imagePart1 = {
        inlineData: {
          data: req.files.resume1[0].buffer.toString('base64'),
          mimeType: 'application/pdf',
        },
      };
  
      const imagePart2 = {
        inlineData: {
          data: req.files.resume2[0].buffer.toString('base64'),
          mimeType: 'application/pdf',
        },
      };
  
      const result = await model.generateContent([prompt, imagePart1, imagePart2]);
      const response = await result.response;
      const text = response.text();
  
      res.json({ comparison: text });
    } catch (error) {
      console.error("Gemini API error:", error?.response?.data || error.message || error);
      res.status(500).json({ error: 'Something went wrong while comparing the resumes.' });
    }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});