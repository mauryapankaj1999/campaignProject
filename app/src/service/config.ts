// API Endpoints - Define full URLs here
export const API_ENDPOINTS = {
  // Campaigns endpoints
  CAMPAIGNS_LIST: "https://mixo-fe-backend-task.vercel.app/campaigns",
  CAMPAIGN_DETAIL: (id: string) => `https://mixo-fe-backend-task.vercel.app/campaigns/${id}`,
  CAMPAIGN_INSIGHTS: (id: string) => `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights`,
  
  // Add more endpoints here:
  // USERS_LIST: "https://mixo-fe-backend-task.vercel.app/users",
  // USER_DETAIL: (id: string) => `https://mixo-fe-backend-task.vercel.app/users/${id}`,
};

