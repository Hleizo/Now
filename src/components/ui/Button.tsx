import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "deal";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 btn-press disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-action-500 focus-visible:outline-offset-2";

  const variants = {
    // Blue action button - main CTA
    primary: "bg-action-500 text-white hover:bg-action-600 shadow-sm",
    // Navy secondary button - trust/serious actions
    secondary: "bg-navy-500 text-white hover:bg-navy-600 shadow-sm",
    // Outline with blue border
    outline: "border-2 border-action-500 text-action-500 hover:bg-action-50",
    // Ghost button
    ghost: "text-text-primary hover:bg-gray-100",
    // Deal/promo button with amber
    deal: "bg-deal-500 text-text-primary hover:bg-deal-600 font-bold shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]",
    md: "px-4 sm:px-5 py-2.5 text-sm sm:text-base min-h-[42px] sm:min-h-[44px]",
    lg: "px-5 sm:px-6 py-3 text-base sm:text-lg min-h-[48px] sm:min-h-[52px]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
