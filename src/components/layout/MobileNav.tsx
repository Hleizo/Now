"use client";

import React from "react";
import {
  HomeIcon,
  CategoryIcon,
  HeartIcon,
  CartIcon,
  UserIcon,
} from "@/components/icons/Icons";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  badgeType?: "action" | "deal";
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/" },
  { id: "categories", label: "Categories", icon: <CategoryIcon className="w-5 h-5" />, href: "/categories" },
  { id: "wishlist", label: "Wishlist", icon: <HeartIcon className="w-5 h-5" />, href: "/wishlist", badge: 5, badgeType: "action" },
  { id: "cart", label: "Cart", icon: <CartIcon className="w-5 h-5" />, href: "/cart", badge: 3, badgeType: "deal" },
  { id: "account", label: "Account", icon: <UserIcon className="w-5 h-5" />, href: "/account" },
];

export function MobileNav() {
  const currentPath = "/";

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border"
      style={{ 
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.06)'
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-1 pt-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`relative flex flex-col items-center justify-center min-w-[56px] py-1.5 rounded-lg transition-all tap-feedback ${
                isActive
                  ? "text-action-500"
                  : "text-text-secondary"
              }`}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.badge ? `${item.label} with ${item.badge} items` : item.label}
            >
              {/* Active indicator bar - top */}
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-action-500 rounded-full" />
              )}
              
              {/* Icon with badge */}
              <div className="relative">
                <span className={isActive ? "text-action-500" : "text-text-secondary"}>{item.icon}</span>
                {item.badge && (
                  <span className={`absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-1 text-[9px] font-bold rounded-full flex items-center justify-center ${
                    item.badgeType === "deal" 
                      ? "bg-deal-500 text-navy-500" 
                      : "bg-action-500 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
              
              {/* Label - slightly larger for readability */}
              <span className={`text-[10px] mt-0.5 font-medium ${isActive ? "text-action-500" : "text-text-secondary"}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
