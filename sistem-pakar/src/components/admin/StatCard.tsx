import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: { value: number; positive: boolean };
  color?: "green" | "blue" | "purple" | "orange";
}

const colorMap = {
  green: {
    bg: "bg-green-50",
    iconBg: "bg-green-500",
    badge: "text-green-600 bg-green-50",
    value: "text-green-700",
  },
  blue: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-500",
    badge: "text-blue-600 bg-blue-50",
    value: "text-blue-700",
  },
  purple: {
    bg: "bg-purple-50",
    iconBg: "bg-purple-500",
    badge: "text-purple-600 bg-purple-50",
    value: "text-purple-700",
  },
  orange: {
    bg: "bg-orange-50",
    iconBg: "bg-orange-500",
    badge: "text-orange-600 bg-orange-50",
    value: "text-orange-700",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = "green",
}: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className={cn("text-3xl font-bold mt-1 tabular-nums", c.value)}>{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1 truncate">{description}</p>
          )}
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium mt-2 px-2 py-0.5 rounded-full",
                trend.positive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
              )}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
              <span className="text-muted-foreground font-normal">dari bulan lalu</span>
            </span>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
            c.iconBg
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
