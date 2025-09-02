import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target",
  {
    variants: {
      variant: {
        default: "bg-accent-primary text-text-inverse hover:bg-accent-primary-hover shadow-sm",
        destructive: "bg-danger text-text-inverse hover:bg-danger/90 shadow-sm",
        outline: "border border-border bg-surface hover:bg-surface-2 hover:text-text-primary shadow-sm",
        secondary: "bg-surface-2 text-text-secondary hover:bg-surface-2/80 shadow-sm",
        ghost: "hover:bg-surface-2 hover:text-text-primary",
        link: "text-accent-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 font-medium",
        sm: "h-9 px-4 text-sm font-medium",
        lg: "h-12 px-8 font-medium", 
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target",
        buttonVariants({ variant, size, className })
      )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
