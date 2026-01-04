"use client";

import { useEffect } from "react";
import { CampaignInsights } from "@/types/campaign";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

interface CampaignInsightsSidebarProps {
  insights: CampaignInsights | null;
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CampaignInsightsSidebar({
  insights,
  loading,
  error,
  isOpen,
  onClose,
}: CampaignInsightsSidebarProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-900">Campaign Insights</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} />
          ) : insights ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Campaign ID</p>
                <p className="text-base font-semibold text-gray-900">{insights.campaign_id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                <p className="text-base text-gray-900">{formatDate(insights.timestamp)}</p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="text-sm font-medium text-blue-700 mb-1">Impressions</p>
                  <p className="text-2xl font-bold text-blue-900">{formatNumber(insights.impressions)}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <p className="text-sm font-medium text-green-700 mb-1">Clicks</p>
                  <p className="text-2xl font-bold text-green-900">{formatNumber(insights.clicks)}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <p className="text-sm font-medium text-purple-700 mb-1">Conversions</p>
                  <p className="text-2xl font-bold text-purple-900">{formatNumber(insights.conversions)}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                  <p className="text-sm font-medium text-orange-700 mb-1">Spend</p>
                  <p className="text-2xl font-bold text-orange-900">{formatCurrency(insights.spend)}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">Click-Through Rate (CTR)</p>
                      <p className="text-xl font-bold text-gray-900">{formatPercentage(insights.ctr)}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">Cost Per Click (CPC)</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(insights.cpc)}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">Conversion Rate</p>
                      <p className="text-xl font-bold text-gray-900">{formatPercentage(insights.conversion_rate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}




