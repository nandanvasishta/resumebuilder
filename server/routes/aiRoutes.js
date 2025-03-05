import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/generate-summary", async (req, res) => {
  try {
    const { jobRole, resumeData } = req.body;

    if (!jobRole || !resumeData) {
      return res.status(400).json({ error: "Job role and resume data are required." });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Generate a professional resume summary for a ${jobRole}. Resume data: ${JSON.stringify(resumeData)}`,
            },
          ],
        },
      ],
    };

    console.log("📤 Sending Request to Gemini API:", JSON.stringify(payload, null, 2));

    const response = await axios.post(apiUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("📥 AI Response:", JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.candidates) {
      return res.status(500).json({ error: "Invalid response from AI service" });
    }

    const summary = response.data.candidates[0]?.content?.parts?.[0]?.text || "Summary generation failed.";

    res.json({ summary });

  } catch (error) {
    console.error("❌ AI Summary Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate summary",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
