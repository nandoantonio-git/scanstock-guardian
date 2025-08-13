import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MedicalCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "gradient";
  size?: "sm" | "md" | "lg";
}

export function MedicalCard({ 
  children, 
  className,
  variant = "default",
  size = "md" 
}: MedicalCardProps) {
  const variants = {
    default: "bg-card border border-border shadow-soft",
    elevated: "bg-card border border-border shadow-medium hover:shadow-strong transition-smooth",
    gradient: "bg-gradient-card border border-border/50 shadow-medium backdrop-blur-sm"
  };

  const sizes = {
    sm: "p-4 rounded-lg",
    md: "p-6 rounded-xl",
    lg: "p-8 rounded-2xl"
  };

  return (
    <div 
      className={cn(
        "transition-smooth",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}