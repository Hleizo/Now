import React from "react";

interface BadgeProps {
  variant: "sale" | "new" | "bestseller" | "limited" | "discount";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = "" }: BadgeProps) {
  const variants = {
    sale: "bg-red-500 text-white",
    new: "bg-emerald-500 text-white",
    bestseller: "bg-amber-500 text-white",
    limited: "bg-purple-500 text-white animate-pulse-badge",
    discount: "bg-primary-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
