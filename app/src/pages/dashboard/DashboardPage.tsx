"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Campaign, CampaignStatus } from "@/types/campaign";
import { fetchCampaigns, fetchCampaignById, fetchCampaignInsights } from "@/app/src/service/apiService";
import CampaignCard from "@/app/src/component/CampaignCard";
import SearchBar from "@/app/src/component/SearchBar";
import StatusFilter from "@/app/src/component/StatusFilter";
import LoadingState from "@/app/src/component/LoadingState";
import EmptyState from "@/app/src/component/EmptyState";
import ErrorState from "@/app/src/component/ErrorState";
import DashboardLayout from "@/app/src/component/DashboardLayout";
import CampaignDetailsSidebar from "@/app/src/component/CampaignDetailsSidebar";
import CampaignInsightsSidebar from "@/app/src/component/CampaignInsightsSidebar";
import { CampaignInsights } from "@/types/campaign";

export default function DashboardPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "all">("all");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [sidebarError, setSidebarError] = useState<string | null>(null);
  const [selectedInsightsId, setSelectedInsightsId] = useState<string | null>(null);
  const [selectedInsights, setSelectedInsights] = useState<CampaignInsights | null>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCampaigns();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setCampaigns(data);
        } else {
          throw new Error("Invalid data format: expected an array");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load campaigns";
        setError(errorMessage);
        setCampaigns([]); // Reset to empty array on error
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const handleRetry = () => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCampaigns();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setCampaigns(data);
        } else {
          throw new Error("Invalid data format: expected an array");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaigns");
        setCampaigns([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };
    loadCampaigns();
  };

  const filteredCampaigns = useMemo(() => {
    if (!Array.isArray(campaigns)) {
      return [];
    }
    return campaigns.filter((campaign) => {
      const matchesSearch =
        searchQuery === "" ||
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchQuery, statusFilter]);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    if (!Array.isArray(campaigns)) {
      return { all: 0, active: 0, paused: 0, ended: 0 };
    }
    
    const filteredBySearch = campaigns.filter((campaign) =>
      searchQuery === "" ||
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      all: filteredBySearch.length,
      active: filteredBySearch.filter((c) => c.status === "active").length,
      paused: filteredBySearch.filter((c) => c.status === "paused").length,
      ended: filteredBySearch.filter((c) => c.status === "ended").length,
    };
  }, [campaigns, searchQuery]);

  // Load campaign details when sidebar opens
  useEffect(() => {
    const loadCampaignDetails = async () => {
      if (!selectedCampaignId) {
        setSelectedCampaign(null);
        return;
      }

      try {
        setSidebarLoading(true);
        setSidebarError(null);
        const campaignData = await fetchCampaignById(selectedCampaignId);
        setSelectedCampaign(campaignData);
      } catch (err) {
        setSidebarError(err instanceof Error ? err.message : "Failed to load campaign details");
        setSelectedCampaign(null);
      } finally {
        setSidebarLoading(false);
      }
    };

    loadCampaignDetails();
  }, [selectedCampaignId]);

  // Load campaign insights when insights sidebar opens
  useEffect(() => {
    const loadCampaignInsights = async () => {
      if (!selectedInsightsId) {
        setSelectedInsights(null);
        return;
      }

      try {
        setInsightsLoading(true);
        setInsightsError(null);
        const insightsData = await fetchCampaignInsights(selectedInsightsId);
        setSelectedInsights(insightsData);
      } catch (err) {
        setInsightsError(err instanceof Error ? err.message : "Failed to load campaign insights");
        setSelectedInsights(null);
      } finally {
        setInsightsLoading(false);
      }
    };

    loadCampaignInsights();
  }, [selectedInsightsId]);

  const handleCampaignClick = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
  };

  const handleCloseSidebar = () => {
    setSelectedCampaignId(null);
    setSelectedCampaign(null);
    setSidebarError(null);
  };

  const handleCloseInsightsSidebar = () => {
    setSelectedInsightsId(null);
    setSelectedInsights(null);
    setInsightsError(null);
  };

  const content = (
    <>
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : (
        <>
          <div className="mb-6 space-y-4 my-5">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1 w-[30%]">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div className="w-full sm:w-auto">
                <StatusFilter
                  selectedStatus={statusFilter}
                  onStatusChange={setStatusFilter}
                  statusCounts={statusCounts}
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredCampaigns.length} of {campaigns.length} campaigns
            </div>
          </div>

          {filteredCampaigns.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onDetailsClick={handleCampaignClick}
                  onInsightsClick={(id) => {
                    router.push(`/campaigns/${id}/insights`);
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      <CampaignDetailsSidebar
        campaign={selectedCampaign}
        loading={sidebarLoading}
        error={sidebarError}
        isOpen={selectedCampaignId !== null}
        onClose={handleCloseSidebar}
      />

      <CampaignInsightsSidebar
        insights={selectedInsights}
        loading={insightsLoading}
        error={insightsError}
        isOpen={selectedInsightsId !== null}
        onClose={handleCloseInsightsSidebar}
      />
    </>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
}

