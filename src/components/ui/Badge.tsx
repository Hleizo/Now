import React from "react";

interface BadgeProps {
  variant: "sale" | "new" | "bestseller" | "limited" | "discount";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = "" }: BadgeProps) {
  const variants = {
    // Amber for deals and discounts - attention grabbing
    sale: "bg-deal-500 text-text-primary font-bold",
    discount: "bg-deal-500 text-text-primary font-bold",
    limited: "bg-deal-500 text-text-primary font-bold animate-pulse-deal",
    // Green for positive states
    new: "bg-success text-white",
    bestseller: "bg-action-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
