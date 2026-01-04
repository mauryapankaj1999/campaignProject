"use client";

import { useEffect } from "react";
import { Campaign } from "@/types/campaign";
import Badge from "./Badge";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

interface CampaignDetailsSidebarProps {
  campaign: Campaign | null;
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CampaignDetailsSidebar({
  campaign,
  loading,
  error,
  isOpen,
  onClose,
}: CampaignDetailsSidebarProps) {
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
          <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>
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
          ) : campaign ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {campaign.name}
                  </h1>
                  <p className="text-gray-500">Campaign ID: {campaign.id}</p>
                </div>
                <Badge status={campaign.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </>
  );
}

