"use client";

import { useParams } from "next/navigation";
import CampaignInsightsPage from "@/app/src/pages/campaigns/CampaignInsightsPage";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  
  return <CampaignInsightsPage id={id} />;
}




