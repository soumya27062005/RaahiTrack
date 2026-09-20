import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrafficStatusCardProps {
  title: string;
  status: "free" | "moderate" | "heavy";
  count: number;
  icon: LucideIcon;
  className?: string;
}

const statusConfig = {
  free: {
    className: "status-free",
    label: "Free Flow",
    bgClass: "bg-success/10 border-success/20"
  },
  moderate: {
    className: "status-moderate", 
    label: "Moderate",
    bgClass: "bg-warning/10 border-warning/20"
  },
  heavy: {
    className: "status-heavy",
    label: "Heavy",
    bgClass: "bg-destructive/10 border-destructive/20"
  }
};

export default function TrafficStatusCard({ 
  title, 
  status, 
  count, 
  icon: Icon, 
  className 
}: TrafficStatusCardProps) {
  const config = statusConfig[status];
  
  return (
    <div className={cn(
      "traffic-card-elevated p-6 animate-fade-in-scale",
      config.bgClass,
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl traffic-pulse",
          config.className
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">{count}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Routes
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{config.label} Traffic</p>
      </div>
    </div>
  );
}
