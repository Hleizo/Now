"use client";

import React, { useState } from "react";
import { SearchIcon, CartIcon, MenuIcon } from "@/components/icons/Icons";

export function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 safe-top">
      {/* Top Bar - Logo and Icons */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-xl font-bold text-slate-900 hidden sm:block">Now</span>
        </a>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search for products, brands..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors touch-target"
            aria-label="Menu"
          >
            <MenuIcon className="w-6 h-6 text-slate-700" />
          </button>

          {/* Cart */}
          <button
            className="relative p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors touch-target"
            aria-label="Shopping cart, 3 items"
          >
            <CartIcon className="w-6 h-6 text-slate-700" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div
          className={`relative transition-all duration-200 ${
            searchFocused ? "transform scale-[1.02]" : ""
          }`}
        >
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="search"
            placeholder="Search for products, brands..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary-500 focus:bg-white focus:outline-none transition-all text-base"
            aria-label="Search products"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
    </header>
  );
}
