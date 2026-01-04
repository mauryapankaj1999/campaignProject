import { CampaignStatus } from "@/types/campaign";

interface StatusFilterProps {
  selectedStatus: CampaignStatus | "all";
  onStatusChange: (status: CampaignStatus | "all") => void;
  statusCounts?: {
    all: number;
    active: number;
    paused: number;
    ended: number;
  };
}

const statuses: Array<CampaignStatus | "all"> = ["all", "active", "paused", "ended"];

export default function StatusFilter({
  selectedStatus,
  onStatusChange,
  statusCounts,
}: StatusFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {statuses.map((status) => {
        const count = statusCounts?.[status as keyof typeof statusCounts] ?? 0;
        const label = status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1);
        
        return (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              selectedStatus === status
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <span>{label}</span>
            <span
              // className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              //   selectedStatus === status
              //     ? "bg-blue-500 text-white"
              //     : "bg-gray-200 text-gray-600"
              // }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

