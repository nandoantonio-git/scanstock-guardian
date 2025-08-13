import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { MedicalCard } from "./medical-card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  trend,
  className
}: MetricCardProps) {
  const variants = {
    default: {
      card: "border-primary/20",
      icon: "text-primary bg-primary/10",
      value: "text-foreground"
    },
    success: {
      card: "border-success/20 bg-success-light/20",
      icon: "text-success bg-success/10",
      value: "text-success"
    },
    warning: {
      card: "border-warning/20 bg-warning-light/20",
      icon: "text-warning bg-warning/10",
      value: "text-warning"
    },
    destructive: {
      card: "border-destructive/20 bg-destructive-light/20",
      icon: "text-destructive bg-destructive/10",
      value: "text-destructive"
    }
  };

  const config = variants[variant];

  return (
    <MedicalCard 
      variant="elevated" 
      className={cn(config.card, className)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className={cn("text-2xl font-bold", config.value)}>
              {value}
            </p>
            {trend && (
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive 
                  ? "text-success bg-success/10" 
                  : "text-destructive bg-destructive/10"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          config.icon
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </MedicalCard>
  );
}