import React from "react";
import { forwardRef } from "react";

const Button = forwardRef(({ 
  className = "",
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? "span" : "button";
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-black text-white hover:bg-black/90",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-black",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 text-xs",
    lg: "h-11 px-8 text-base",
  };

  return (
    <Comp
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button };