import React from "react";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className = "" }: CategoryCardProps) {
  const { name, icon, color } = category;

  return (
    <a
      href={category.href}
      className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 active:scale-95 hover:shadow-card ${className}`}
      style={{ backgroundColor: color }}
    >
      <span className="text-3xl sm:text-4xl" role="img" aria-label={name}>
        {icon}
      </span>
      <span className="text-xs sm:text-sm font-medium text-slate-700 text-center whitespace-nowrap">
        {name}
      </span>
    </a>
  );
}
