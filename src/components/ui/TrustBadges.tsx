import React from "react";
import type { TrustBadge } from "@/types";

interface TrustBadgesProps {
  badges: TrustBadge[];
  className?: string;
}

export function TrustBadges({ badges, className = "" }: TrustBadgesProps) {
  return (
    <section className={`py-6 sm:py-8 px-3 sm:px-6 bg-white ${className}`} aria-label="Trust badges">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center text-center p-4 sm:p-5 bg-gradient-to-br ${badge.bgClass} rounded-2xl border ${badge.borderClass} shadow-sm`}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 ${badge.colorClass} rounded-2xl flex items-center justify-center mb-3 shadow-md`}
                aria-hidden="true"
              >
                <span className="text-2xl sm:text-3xl">{badge.icon}</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-navy-500">{badge.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
