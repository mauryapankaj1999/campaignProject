"use client";

import { useParams } from "next/navigation";
import { CampaignDetailsPage } from "@/app/src/pages";

export default function Page() {
  const { id } = useParams();
  return <CampaignDetailsPage id={id as string} />;
}

