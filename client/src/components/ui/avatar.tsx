import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "../../lib/utils"


interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: "sm" | "md" | "lg" | "xl";
}

function Avatar({
  className,
  size = "md",
  ...props
}: AvatarProps) {
  const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
    sm: "size-8",
    md: "size-10",  
    lg: "size-12", 
    xl: "size-16",
  };

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "cursor-pointer relative flex shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "font-semibold bg-emerald-600 text-white flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
