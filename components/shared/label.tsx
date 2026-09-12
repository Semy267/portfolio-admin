import { cn } from "@/lib/utils";

export default function Label({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-14 font-medium font-primary text-natural-dark-80 truncate",
        className,
      )}
    >
      {label}
    </span>
  );
}
