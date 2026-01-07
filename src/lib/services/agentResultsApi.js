import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const agentResultsApi = {
  getCareerPlan: async (token) => {
    try {
      console.log(`[Agent API] Calling GET ${API_BASE_URL}/agent-results/career-plan`);
      const response = await axios.get(`${API_BASE_URL}/agent-results/career-plan`, { headers: { Authorization: `Bearer ${token}` } });
      console.log('[Agent API] ✓ GET /agent-results/career-plan:', response.data);
      return response.data;
    } catch (error) {
      console.error('[Agent API] ✗ GET /agent-results/career-plan FAILED:', error.response?.data || error.message);
      throw error;
    }
  },
  
  getResumeAnalysis: async (token) => {
    try {
      console.log(`[Agent API] Calling GET ${API_BASE_URL}/agent-results/resume-analysis`);
      const response = await axios.get(`${API_BASE_URL}/agent-results/resume-analysis`, { headers: { Authorization: `Bearer ${token}` } });
      console.log('[Agent API] ✓ GET /agent-results/resume-analysis:', response.data);
      return response.data;
    } catch (error) {
      console.error('[Agent API] ✗ GET /agent-results/resume-analysis FAILED:', error.response?.data || error.message);
      throw error;
    }
  },
  
  getJobMatches: async (token, status = 'new') => {
    try {
      console.log(`[Agent API] Calling GET ${API_BASE_URL}/agent-results/job-matches?status=${status}`);
      const response = await axios.get(`${API_BASE_URL}/agent-results/job-matches?status=${status}`, { headers: { Authorization: `Bearer ${token}` } });
      console.log(`[Agent API] ✓ GET /agent-results/job-matches?status=${status}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`[Agent API] ✗ GET /agent-results/job-matches FAILED:`, error.response?.data || error.message);
      throw error;
    }
  },
  
  getAgentStatus: async (token) => {
    try {
      console.log(`[Agent API] Calling GET ${API_BASE_URL}/agent-results/agent-status`);
      const response = await axios.get(`${API_BASE_URL}/agent-results/agent-status`, { headers: { Authorization: `Bearer ${token}` } });
      console.log('[Agent API] ✓ GET /agent-results/agent-status:', response.data);
      return response.data;
    } catch (error) {
      console.error('[Agent API] ✗ GET /agent-results/agent-status FAILED:', error.response?.data || error.message);
      throw error;
    }
  },
  
  updateJobMatchStatus: async (token, matchId, status) => {
    try {
      console.log(`[Agent API] Calling PATCH ${API_BASE_URL}/agent-results/job-matches/${matchId}`);
      const response = await axios.patch(`${API_BASE_URL}/agent-results/job-matches/${matchId}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      console.log(`[Agent API] ✓ PATCH /agent-results/job-matches/${matchId}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`[Agent API] ✗ PATCH /agent-results/job-matches/${matchId} FAILED:`, error.response?.data || error.message);
      throw error;
    }
  }
};
