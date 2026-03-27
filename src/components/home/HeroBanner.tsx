"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Banner } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/Icons";
import { Button } from "@/components/ui";

interface HeroBannerProps {
  banners: Banner[];
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  }, [currentIndex, banners.length, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % banners.length);
  }, [currentIndex, banners.length, goToSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      goToNext();
    } else if (diff < -threshold) {
      goToPrevious();
    }
  };

  return (
    <section className="relative" aria-label="Promotional banners">
      {/* Banner Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="w-full flex-shrink-0"
            >
              <div
                className="relative h-40 sm:h-56 md:h-72 lg:h-80 mx-4 sm:mx-6 rounded-2xl overflow-hidden"
                style={{ backgroundColor: banner.bgColor }}
              >
                {/* Background Image */}
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  className="object-cover"
                  priority={banner.id === "1"}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 banner-gradient" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 md:p-12">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3"
                    style={{ color: banner.textColor }}
                  >
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p
                      className="text-sm sm:text-base md:text-lg opacity-90 mb-4 sm:mb-6 max-w-md"
                      style={{ color: banner.textColor }}
                    >
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.ctaText && (
                    <div>
                      <Button
                        variant="primary"
                        size="md"
                        className="bg-white text-slate-900 hover:bg-slate-100"
                      >
                        {banner.ctaText}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <button
        onClick={goToPrevious}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all"
        aria-label="Previous banner"
      >
        <ChevronLeftIcon className="w-5 h-5 text-slate-700" />
      </button>
      <button
        onClick={goToNext}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all"
        aria-label="Next banner"
      >
        <ChevronRightIcon className="w-5 h-5 text-slate-700" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4 px-4">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-primary-500"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </section>
  );
}
