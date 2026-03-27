import React from "react";
import Image from "next/image";
import { PromoCard } from "@/types";

interface PromoSectionProps {
  promos: PromoCard[];
}

export function PromoSection({ promos }: PromoSectionProps) {
  return (
    <section className="py-4 sm:py-6 px-4 sm:px-6" aria-label="Promotions">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((promo) => (
          <a
            key={promo.id}
            href={promo.href}
            className="relative h-32 sm:h-40 rounded-2xl overflow-hidden group"
            style={{ backgroundColor: promo.bgColor }}
          >
            {/* Background Image */}
            <Image
              src={promo.image}
              alt={promo.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center p-5">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                {promo.title}
              </h3>
              <p className="text-white/80 text-sm">{promo.subtitle}</p>
              <span className="mt-3 text-white text-sm font-medium group-hover:underline">
                Shop Now →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
