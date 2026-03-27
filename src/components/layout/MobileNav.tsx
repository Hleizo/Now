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
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon />, href: "/" },
  { id: "categories", label: "Categories", icon: <CategoryIcon />, href: "/categories" },
  { id: "wishlist", label: "Wishlist", icon: <HeartIcon />, href: "/wishlist", badge: 5 },
  { id: "cart", label: "Cart", icon: <CartIcon />, href: "/cart", badge: 3 },
  { id: "account", label: "Account", icon: <UserIcon />, href: "/account" },
];

export function MobileNav() {
  const currentPath = "/";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-nav safe-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-colors touch-target ${
                isActive
                  ? "text-action-500"
                  : "text-text-secondary hover:text-navy-500 active:bg-surface"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon with badge */}
              <div className="relative">
                <span className={isActive ? "text-action-500" : ""}>{item.icon}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-action-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-action-500" : ""}`}>
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 bg-action-500 rounded-full" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
