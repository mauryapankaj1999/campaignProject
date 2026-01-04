"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/src/component/DashboardLayout";
import LoadingState from "@/app/src/component/LoadingState";
import ErrorState from "@/app/src/component/ErrorState";
import Badge from "@/app/src/component/Badge";
import { Campaign } from "@/types/campaign";
import { fetchCampaignById } from "@/app/src/service/apiService";

interface CampaignDetailsPageProps {
  id: string;
}

export default function CampaignDetailsPage({ id }: CampaignDetailsPageProps) {
  const router = useRouter();
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCampaignDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const campaignData = await fetchCampaignById(id);
        setCampaign(campaignData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaign details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCampaignDetails();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  const content = (
    <>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Campaigns
        </button>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : campaign ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {campaign.name}
              </h1>
              <p className="text-gray-500">Campaign ID: {campaign.id}</p>
            </div>
            <Badge status={campaign.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Budget</h3>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(campaign.budget)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Daily Budget</h3>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(campaign.daily_budget)}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {campaign.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Created Date</h3>
              <p className="text-base text-gray-900">{formatDate(campaign.created_at)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <p className="text-base text-gray-900 capitalize">{campaign.status}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
}

