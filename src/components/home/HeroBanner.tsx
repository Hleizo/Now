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
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  }, [currentIndex, banners.length, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % banners.length);
  }, [currentIndex, banners.length, goToSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) goToNext();
    else if (diff < -50) goToPrevious();
  };

  return (
    <section className="py-3 sm:py-4 px-3 sm:px-6 bg-white" aria-label="Promotional banners">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout: Main Banner + Side Banners */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
          {/* Main Banner */}
          <div
            className="col-span-2 relative h-80 xl:h-96 rounded-3xl overflow-hidden cursor-pointer group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {banners.map((banner) => (
                <div key={banner.id} className="w-full h-full flex-shrink-0 relative">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    priority={banner.id === "1"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-500/90 via-navy-500/60 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center p-8 xl:p-12">
                    <span className="inline-block bg-deal-500 text-text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit animate-pulse-deal">
                      HOT DEAL
                    </span>
                    <h2 className="text-3xl xl:text-5xl font-extrabold text-white mb-3 max-w-lg">
                      {banner.title}
                    </h2>
                    {banner.subtitle && (
                      <p className="text-lg text-white/90 mb-6 max-w-md">{banner.subtitle}</p>
                    )}
                    {banner.ctaText && (
                      <Button variant="primary" size="lg" className="w-fit shadow-lg">
                        {banner.ctaText}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all btn-press"
              aria-label="Previous banner"
            >
              <ChevronLeftIcon className="w-6 h-6 text-navy-500" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all btn-press"
              aria-label="Next banner"
            >
              <ChevronRightIcon className="w-6 h-6 text-navy-500" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Side Banners */}
          <div className="flex flex-col gap-4">
            <a
              href="/electronics"
              className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer hover-lift"
            >
              <Image
                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"
                alt="Electronics Sale"
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-500/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block bg-deal-500 text-text-primary text-xs font-bold px-2 py-1 rounded mb-2">
                  UP TO 50% OFF
                </span>
                <h3 className="text-xl font-bold text-white">Electronics Week</h3>
              </div>
            </a>
            <a
              href="/fashion"
              className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer hover-lift"
            >
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                alt="Fashion Deals"
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-500/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block bg-success text-white text-xs font-bold px-2 py-1 rounded mb-2">
                  NEW ARRIVALS
                </span>
                <h3 className="text-xl font-bold text-white">Fashion Trends</h3>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile/Tablet Layout: Optimized for 360-414px */}
        <div className="lg:hidden">
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {banners.map((banner) => (
                <div key={banner.id} className="w-full flex-shrink-0">
                  {/* Responsive aspect ratio banner */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                    {/* Loading skeleton */}
                    {!imagesLoaded[banner.id] && (
                      <div className="absolute inset-0 skeleton" />
                    )}
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      sizes="100vw"
                      className={`object-cover transition-opacity duration-300 ${
                        imagesLoaded[banner.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={banner.id === "1"}
                      onLoad={() => setImagesLoaded(prev => ({ ...prev, [banner.id]: true }))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-500/90 via-navy-500/60 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-6">
                      <span className="inline-block bg-deal-500 text-text-primary text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full mb-2 w-fit animate-pulse-deal">
                        HOT DEAL
                      </span>
                      <h2 className="text-lg sm:text-2xl font-extrabold text-white mb-1 sm:mb-2 leading-tight">
                        {banner.title}
                      </h2>
                      {banner.subtitle && (
                        <p className="text-xs sm:text-sm text-white/90 mb-2 sm:mb-3 max-w-[200px] sm:max-w-xs line-clamp-2">
                          {banner.subtitle}
                        </p>
                      )}
                      {banner.ctaText && (
                        <Button variant="primary" size="sm" className="w-fit text-xs sm:text-sm shadow-md btn-press">
                          {banner.ctaText}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Dots - Larger tap targets */}
            <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all touch-target ${
                    index === currentIndex 
                      ? "w-5 sm:w-6 h-1.5 sm:h-2 bg-white" 
                      : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  style={{ minWidth: index === currentIndex ? '20px' : '6px' }}
                />
              ))}
            </div>
          </div>

          {/* Mobile Side Banners - Optimized scroll */}
          <div className="flex gap-2.5 mt-2.5 sm:mt-3 overflow-x-auto scrollbar-hide snap-x smooth-scroll pb-1">
            <a
              href="/electronics"
              className="flex-shrink-0 snap-start w-[65%] sm:w-[48%] relative aspect-[16/9] rounded-xl overflow-hidden tap-feedback"
            >
              <Image
                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80"
                alt="Electronics"
                fill
                sizes="65vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-500/90 to-transparent" />
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                <span className="inline-block bg-deal-500 text-text-primary text-[10px] font-bold px-1.5 py-0.5 rounded mb-1">
                  50% OFF
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white">Electronics</h3>
              </div>
            </a>
            <a
              href="/fashion"
              className="flex-shrink-0 snap-start w-[65%] sm:w-[48%] relative aspect-[16/9] rounded-xl overflow-hidden tap-feedback"
            >
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
                alt="Fashion"
                fill
                sizes="65vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-500/90 to-transparent" />
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                <span className="inline-block bg-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded mb-1">
                  NEW
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white">Fashion</h3>
              </div>
            </a>
            {/* End padding */}
            <div className="w-3 flex-shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
