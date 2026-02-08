import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const fetchAnalysis = async (coinCode) => {
  try {
    // We only need to call the Orchestrator. 
    // It already returns the breakdown for Chain, Gov, and Social!
    const response = await axios.get(`${API_BASE_URL}/orchestrate`, {
      params: { coin_name: coinCode }
    });
    return response.data;
  } catch (error) {
    console.error("API Connection Error:", error);
    throw error;
  }
};