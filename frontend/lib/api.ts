import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Missions API
export const missionsApi = {
  createMission: async (data: any) => {
    const response = await api.post('/missions/', data);
    return response.data;
  },
  
  getMissions: async () => {
    const response = await api.get('/missions/');
    return response.data;
  },
  
  getMission: async (id: number) => {
    const response = await api.get(/missions/);
    return response.data;
  },
  
  createTask: async (missionId: number, data: any) => {
    const response = await api.post(/missions//tasks, data);
    return response.data;
  },
  
  getTasks: async (missionId: number) => {
    const response = await api.get(/missions//tasks);
    return response.data;
  },
};

// Health check
export const healthApi = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};
