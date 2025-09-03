import { cn } from "@/lib/utils"

/* "Esqueleto" de um conteúdo que está sendo construído */
function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
