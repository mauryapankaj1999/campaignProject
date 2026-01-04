import { Campaign, CampaignInsights } from "@/types/campaign";
import { API_ENDPOINTS } from "./config";

export async function fetchCampaigns(): Promise<Campaign[]> {
  try {
    const response = await fetch(API_ENDPOINTS.CAMPAIGNS_LIST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 503) {
        throw new Error("Service temporarily unavailable. The server is down or overloaded. Please try again later.");
      } else if (response.status === 404) {
        throw new Error("API endpoint not found. Please check the API configuration.");
      } else if (response.status >= 500) {
        throw new Error(`Server error (${response.status}). Please try again later.`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error("Authentication failed. Please check your credentials.");
      } else {
        throw new Error(`Failed to fetch campaigns: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    
    // Ensure the response is an array
    if (!Array.isArray(data)) {
      // If data is an object with a campaigns property, use that
      if (data && typeof data === "object" && "campaigns" in data && Array.isArray(data.campaigns)) {
        return data.campaigns;
      }
      // If data is an object with a data property, use that
      if (data && typeof data === "object" && "data" in data && Array.isArray(data.data)) {
        return data.data;
      }
      // Otherwise, return empty array or throw error
      throw new Error("Invalid response format: expected an array");
    }
    
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to the server. Please check your internet connection.");
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error: Failed to fetch campaigns");
  }
}

export async function fetchCampaignById(id: string): Promise<Campaign> {
  try {
    const response = await fetch(API_ENDPOINTS.CAMPAIGN_DETAIL(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle different response formats
    let campaignData: Campaign;
    if (data.campaign) {
      campaignData = data.campaign;
    } else if (Array.isArray(data)) {
      campaignData = data[0];
    } else {
      campaignData = data;
    }
    
    return campaignData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error: Failed to fetch campaign");
  }
}

export async function fetchCampaignInsights(id: string): Promise<CampaignInsights> {
  try {
    const response = await fetch(API_ENDPOINTS.CAMPAIGN_INSIGHTS(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign insights: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle response format: { insights: { ... } }
    if (data.insights) {
      return data.insights;
    }
    
    // If insights data is directly in response
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error: Failed to fetch campaign insights");
  }
}

