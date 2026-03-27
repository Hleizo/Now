"use client";

import React, { useState, useEffect } from "react";
import { SearchIcon, CartIcon, HeartIcon, UserIcon, MapPinIcon } from "@/components/icons/Icons";

export function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white safe-top transition-shadow duration-300 ${
      isScrolled ? 'header-elevated' : 'shadow-sm'
    }`}>
      {/* Desktop Header */}
      <div className="hidden md:block">
        {/* Top Bar - Navy background for trust */}
        <div className="bg-navy-500 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-deal-500" />
              <span className="text-gray-300">Deliver to:</span>
              <button className="font-medium hover:text-deal-500 transition-colors">
                Amman, Jordan
              </button>
            </div>
            <div className="flex items-center gap-6">
              <a href="/track" className="hover:text-deal-500 transition-colors">Track Order</a>
              <a href="/help" className="hover:text-deal-500 transition-colors">Help</a>
              <a href="/sell" className="hover:text-deal-500 transition-colors">Sell on Now</a>
            </div>
          </div>
        </div>

        {/* Main Header - White with navy text */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-8">
          {/* Logo - Navy brand color */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity group">
            <div className="w-12 h-12 bg-navy-500 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-extrabold text-2xl">N</span>
            </div>
            <span className="text-2xl font-extrabold text-navy-500">Now</span>
          </a>

          {/* Search Bar - Blue focus state */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="search"
                placeholder="Search for products, brands, categories..."
                className="w-full pl-12 pr-32 py-3.5 bg-surface rounded-2xl border-2 border-border focus:border-action-500 focus:bg-white focus:outline-none transition-all text-base text-text-primary placeholder:text-text-muted"
                aria-label="Search products"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-action-500 hover:bg-action-600 text-white px-6 py-2 rounded-xl font-semibold transition-all btn-press shadow-sm hover:shadow-md">
                Search
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <a
              href="/account"
              className="flex flex-col items-center p-3 rounded-xl hover:bg-surface transition-colors"
            >
              <UserIcon className="w-6 h-6 text-navy-500" />
              <span className="text-xs text-text-secondary mt-1">Account</span>
            </a>
            <a
              href="/wishlist"
              className="flex flex-col items-center p-3 rounded-xl hover:bg-surface transition-colors relative group"
              aria-label="Wishlist with 5 items"
            >
              <HeartIcon className="w-6 h-6 text-navy-500 group-hover:text-action-500 transition-colors" />
              <span className="text-xs text-text-secondary mt-1">Wishlist</span>
              <span className="absolute top-1 right-1 w-5 h-5 bg-action-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                5
              </span>
            </a>
            <a
              href="/cart"
              className="flex flex-col items-center p-3 rounded-xl hover:bg-surface transition-colors relative group"
              aria-label="Cart with 3 items"
            >
              <CartIcon className="w-6 h-6 text-navy-500 group-hover:text-action-500 transition-colors" />
              <span className="text-xs text-text-secondary mt-1">Cart</span>
              <span className="absolute top-1 right-1 w-5 h-5 bg-deal-500 text-navy-500 text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                3
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Header - Optimized for 360px+ */}
      <div className="md:hidden">
        {/* Top Row - Logo, Location, Icons - More compact */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-white">
          {/* Logo - Navy */}
          <a href="/" className="flex items-center gap-1.5 tap-feedback">
            <div className="w-9 h-9 bg-navy-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-lg">N</span>
            </div>
            <span className="text-lg font-extrabold text-navy-500">Now</span>
          </a>

          {/* Location - Centered */}
          <button className="flex items-center gap-1 text-xs tap-highlight px-2 py-1.5 rounded-lg transition-colors">
            <MapPinIcon className="w-4 h-4 text-action-500 flex-shrink-0" />
            <span className="text-text-secondary truncate max-w-[70px]">Amman</span>
          </button>

          {/* Icons - Proper tap targets */}
          <div className="flex items-center">
            <a 
              href="/wishlist" 
              className="relative flex items-center justify-center w-10 h-10 rounded-xl tap-feedback"
              aria-label="Wishlist with 5 items"
            >
              <HeartIcon className="w-5 h-5 text-navy-500" />
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-action-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                5
              </span>
            </a>
            <a 
              href="/cart" 
              className="relative flex items-center justify-center w-10 h-10 rounded-xl tap-feedback"
              aria-label="Cart with 3 items"
            >
              <CartIcon className="w-5 h-5 text-navy-500" />
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-deal-500 text-navy-500 text-[9px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </a>
          </div>
        </div>

        {/* Search Bar - Taller for easy tapping */}
        <div className="px-3 pb-2.5 bg-white">
          <div
            className={`relative transition-all duration-200 ${
              searchFocused ? "ring-2 ring-action-100 rounded-xl" : ""
            }`}
          >
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border-2 border-transparent focus:border-action-500 focus:bg-white focus:outline-none transition-all text-base text-text-primary placeholder:text-text-muted"
              aria-label="Search products"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
