"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FlashDeal } from "@/types";
import { Badge } from "@/components/ui";
import { FireIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/icons/Icons";

interface FlashDealsProps {
  deals: FlashDeal[];
}

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - Date.now();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1 text-sm font-mono">
      <ClockIcon className="w-4 h-4 text-primary-500" />
      <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded">
        {formatNumber(timeLeft.hours)}
      </span>
      <span className="text-slate-500">:</span>
      <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded">
        {formatNumber(timeLeft.minutes)}
      </span>
      <span className="text-slate-500">:</span>
      <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded">
        {formatNumber(timeLeft.seconds)}
      </span>
    </div>
  );
}

function ProgressBar({ sold, total }: { sold: number; total: number }) {
  const percentage = (sold / total) * 100;
  return (
    <div className="mt-2">
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1">{sold} sold</p>
    </div>
  );
}

export function FlashDeals({ deals }: FlashDealsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-4 sm:py-6 bg-gradient-to-r from-primary-500 to-primary-600" aria-label="Flash deals">
      {/* Header */}
      <div className="px-4 sm:px-6 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <FireIcon className="w-6 h-6 text-white" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Flash Deals</h2>
          <Badge variant="limited" className="ml-2">Limited</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-lg px-3 py-1.5">
            <CountdownTimer endTime={deals[0]?.endTime || new Date()} />
          </div>
          <a
            href="/deals"
            className="text-sm font-medium text-white hover:underline hidden sm:block"
          >
            View All →
          </a>
        </div>
      </div>

      {/* Deals Carousel */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-slate-50 transition-colors"
          aria-label="Scroll deals left"
        >
          <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-slate-50 transition-colors"
          aria-label="Scroll deals right"
        >
          <ChevronRightIcon className="w-5 h-5 text-slate-600" />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-3 px-4 sm:px-6 overflow-x-auto scrollbar-hide snap-x pb-2"
        >
          {deals.map((deal) => (
            <article
              key={deal.id}
              className="snap-start flex-shrink-0 w-44 sm:w-52 bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer transition-transform active:scale-[0.98]"
            >
              {/* Image */}
              <div className="relative aspect-square bg-slate-50">
                <Image
                  src={deal.product.image}
                  alt={deal.product.name}
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-cover"
                  loading="lazy"
                />
                {deal.product.discount && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="discount">-{deal.product.discount}%</Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-slate-900 line-clamp-2 min-h-[2.5rem]">
                  {deal.product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-slate-600">{deal.product.rating}</span>
                </div>

                {/* Price */}
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-primary-500">
                    ${deal.product.price.toFixed(2)}
                  </span>
                  {deal.product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ${deal.product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Progress */}
                <ProgressBar sold={deal.soldCount} total={deal.totalStock} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
