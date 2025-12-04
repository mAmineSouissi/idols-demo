import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "rounded-md border border-[--color-border] bg-[--color-panel] px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-[--color-accent]/30",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
