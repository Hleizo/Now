import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 touch-target disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",
    ghost: "text-slate-700 hover:bg-slate-100 active:bg-slate-200",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm min-h-[36px]",
    md: "px-4 py-2.5 text-base min-h-[44px]",
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
