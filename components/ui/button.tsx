import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: brutalist — no radius, bold, uppercase, transitions on shadow/transform
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide border-2 border-border transition-all duration-150 focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        // Primary — Electric Blue
        default:
          "bg-primary text-primary-foreground shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-hard",
        // Destructive — Coral/Red
        destructive:
          "bg-destructive text-destructive-foreground border-border shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-hard",
        // Outline — transparent with hard shadow on hover
        outline:
          "bg-transparent text-foreground hover:bg-secondary hover:shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
        // Outline Primary — transparent with primary color border
        outline_primary:
          "border-primary bg-transparent text-primary hover:bg-primary/10 hover:shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
        // Secondary — secondary surface
        secondary:
          "bg-secondary text-secondary-foreground hover:shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
        // Ghost — minimal, no border, no shadow
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-secondary hover:text-foreground",
        // Link — text only
        link: "border-transparent bg-transparent text-primary normal-case tracking-normal font-medium underline-offset-4 hover:underline",
        // Lime / Accent — Acid Green (success, AI actions)
        lime: "bg-accent text-accent-foreground border-border shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-hard",
        // Yellow — highlight, badges, demo
        yellow:
          "bg-accent-yellow text-foreground border-border shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-hard",
      },
      size: {
        default: "h-10 px-4 py-2",
        none: "p-0",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
      font: {
        default: "font-bold",
        normal: "font-normal normal-case tracking-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
      font: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, font, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, font }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
