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
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] touch-target disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    // Blue action button - main CTA
    primary: "bg-action-500 text-white hover:bg-action-600 active:bg-action-700 shadow-sm",
    // Navy secondary button - trust/serious actions
    secondary: "bg-navy-500 text-white hover:bg-navy-600 active:bg-navy-700 shadow-sm",
    // Outline with blue border
    outline: "border-2 border-action-500 text-action-500 hover:bg-action-50 active:bg-action-100",
    // Ghost button
    ghost: "text-text-primary hover:bg-gray-100 active:bg-gray-200",
    // Deal/promo button with amber
    deal: "bg-deal-500 text-text-primary hover:bg-deal-600 active:bg-deal-700 font-bold shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm min-h-[36px]",
    md: "px-5 py-2.5 text-base min-h-[44px]",
    lg: "px-6 py-3 text-lg min-h-[52px]",
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
