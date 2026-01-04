import { CampaignStatus } from "@/types/campaign";

interface BadgeProps {
  status: CampaignStatus;
}

const statusColors: Record<CampaignStatus, string> = {
  active: "bg-green-100 text-green-800 border-green-200",
  paused: "bg-yellow-100 text-yellow-800 border-yellow-200",
  ended: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

