export type CampaignStatus = "active" | "paused" | "ended";

export interface Campaign {
  id: string;
  name: string;
  brand_id?: string;
  status: CampaignStatus;
  platforms: string[];
  budget: number;
  daily_budget: number;
  created_at: string;
}

export interface CampaignInsights {
  campaign_id: string;
  timestamp: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
}

