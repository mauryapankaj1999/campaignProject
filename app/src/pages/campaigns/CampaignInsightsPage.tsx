"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/src/component/DashboardLayout";
import LoadingState from "@/app/src/component/LoadingState";
import ErrorState from "@/app/src/component/ErrorState";
import { CampaignInsights } from "@/types/campaign";
import { fetchCampaignInsights } from "@/app/src/service/apiService";

interface CampaignInsightsPageProps {
  id: string;
}

export default function CampaignInsightsPage({ id }: CampaignInsightsPageProps) {
  const router = useRouter();
  const [insights, setInsights] = useState<CampaignInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setLoading(true);
        setError(null);
        const insightsData = await fetchCampaignInsights(id);
        setInsights(insightsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaign insights");
        setInsights(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadInsights();
    }
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
      ) : insights ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Insights</h1>
            <p className="text-gray-500">Campaign ID: {insights.campaign_id}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Last Updated</p>
            <p className="text-base text-gray-900">{formatDate(insights.timestamp)}</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <p className="text-sm font-medium text-blue-700 mb-2">Impressions</p>
              <p className="text-3xl font-bold text-blue-900">{formatNumber(insights.impressions)}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border border-green-100">
              <p className="text-sm font-medium text-green-700 mb-2">Clicks</p>
              <p className="text-3xl font-bold text-green-900">{formatNumber(insights.clicks)}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
              <p className="text-sm font-medium text-purple-700 mb-2">Conversions</p>
              <p className="text-3xl font-bold text-purple-900">{formatNumber(insights.conversions)}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
              <p className="text-sm font-medium text-orange-700 mb-2">Spend</p>
              <p className="text-3xl font-bold text-orange-900">{formatCurrency(insights.spend)}</p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Performance Metrics</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-700">Click-Through Rate (CTR)</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPercentage(insights.ctr)}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-700">Cost Per Click (CPC)</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(insights.cpc)}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-700">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPercentage(insights.conversion_rate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
}




