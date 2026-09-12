"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBreakpoint } from "@/lib/hooks";
import { IoMdInformationCircle } from "react-icons/io";

export default function CPopover({
  title,
  description,
  color = "var(--muted-foreground)",
}: {
  title?: string;
  description: string;
  color?: string;
}) {
  const { isDesktop } = useBreakpoint();
  return isDesktop ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <IoMdInformationCircle color={color} size={"20"} />
        </TooltipTrigger>
        <TooltipContent
          align="end"
          className="max-w-[240px] flex flex-col gap-[8px] *:text-sm"
        >
          {title && <p className="font-semibold">{title}</p>}
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <IoMdInformationCircle color={color} size={"20"} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-w-[240px] flex flex-col gap-[8px] *:text-sm"
      >
        {title && <p className="font-semibold">{title}</p>}
        <p>{description}</p>
      </PopoverContent>
    </Popover>
  );
}
