"use client";

import React, { useState, useCallback } from "react";
import { SearchIcon } from "@/components/icons/Icons";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SearchBar({
  placeholder = "Search for products...",
  onSearch,
  className = "",
  size = "md",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(query);
    },
    [query, onSearch]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-10 sm:h-11 text-sm sm:text-base",
    lg: "h-12 sm:h-14 text-base sm:text-lg",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4 sm:w-5 sm:h-5",
    lg: "w-5 h-5 sm:w-6 sm:h-6",
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`} role="search">
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full ${sizeClasses[size]} pl-10 sm:pl-12 pr-4 bg-surface border border-border rounded-xl 
          placeholder:text-gray-400 text-text-primary
          focus:outline-none focus:ring-2 focus:ring-action-500 focus:border-action-500
          transition-all duration-200`}
        aria-label="Search products"
      />
      <SearchIcon
        className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 ${iconSizes[size]} text-gray-400`}
        aria-hidden="true"
      />
    </form>
  );
}
