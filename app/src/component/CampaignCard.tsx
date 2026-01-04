import { Campaign } from "@/types/campaign";
import Badge from "./Badge";

interface CampaignCardProps {
  campaign: Campaign;
  onDetailsClick?: (campaignId: string) => void;
  onInsightsClick?: (campaignId: string) => void;
}

export default function CampaignCard({ 
  campaign, 
  onDetailsClick, 
  onInsightsClick 
}: CampaignCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPlatformColor = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes("meta") || platformLower.includes("facebook")) {
      return "bg-blue-100 text-blue-700";
    } else if (platformLower.includes("google")) {
      return "bg-red-100 text-red-700";
    } else if (platformLower.includes("linkedin")) {
      return "bg-blue-200 text-blue-800";
    } else if (platformLower.includes("instagram")) {
      return "bg-pink-100 text-pink-700";
    } else if (platformLower.includes("twitter") || platformLower.includes("x")) {
      return "bg-gray-100 text-gray-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all group relative">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 pr-8">
          {campaign.name}
        </h3>
        <div className="flex items-center gap-2">
          <Badge status={campaign.status} />
         
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-2">Platforms</p>
          <div className="flex flex-wrap gap-2">
            {campaign.platforms.map((platform) => (
              <span
                key={platform}
                className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getPlatformColor(platform)}`}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Budget</p>
            <p className="text-base font-semibold text-gray-900">
              {formatCurrency(campaign.budget)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Daily Budget</p>
            <p className="text-base font-semibold text-gray-900">
              {formatCurrency(campaign.daily_budget)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Created</p>
          <p className="text-sm text-gray-900">{formatDate(campaign.created_at)}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetailsClick?.(campaign.id);
          }}
          className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
         
          Details Campaign
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInsightsClick?.(campaign.id);
          }}
          className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-gray-300"
        >
        
          View Insights
        </button>
      </div>
    </div>
  );
}

