import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api/ai"; // ✅ Uses .env

export const fetchAIResponse = async (prompt) => {
  try {
    console.log(`Fetching AI Response...`, prompt);

    const response = await axios.post(API_BASE_URL, { prompt });

    console.log(`✅ AI API Response:`, response.data);
    return response.data.message; // ✅ Extract AI response
  } catch (error) {
    console.error(`❌ Error fetching AI response:`, error.response?.data || error.message);
    return null; // Prevent crashes
  }
};
