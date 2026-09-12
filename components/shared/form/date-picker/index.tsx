"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { startOfDay } from "date-fns";
import { toDate, formatInTimeZone } from "date-fns-tz";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Headers from "./headers";
import { useBreakpoint } from "@/lib/hooks";
import { DateRange } from "react-day-picker";

function isDateRange(val: unknown): val is DateRange {
  return (
    typeof val === "object" &&
    val !== null &&
    "from" in val &&
    val["from"] instanceof Date
  );
}

interface BaseDatePicker {
  id?: string;
  className?: string;
  closeOnSelect?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  showIcon?: boolean;
  label?: string;
  children?: React.ReactNode;
  mode?: Mode;
  isHeader?: boolean;
}

type Mode = "single" | "range";

type CalendarDatePickerProps =
  | (BaseDatePicker & {
      mode?: "single";
      value?: Date;
      onChange: (date: Date | undefined) => void;
    })
  | (BaseDatePicker & {
      mode: "range";
      value: DateRange;
      onChange: (range: DateRange | undefined) => void;
    });

const CDatePicker = React.forwardRef<
  HTMLButtonElement,
  CalendarDatePickerProps
>(
  (
    {
      id = "calendar-date-picker",
      className,
      closeOnSelect = false,
      children,
      label,
      value,
      onChange,
      minDate = new Date("1900-01-01"),
      maxDate = new Date(),
      placeholder = "Pick a date",
      showIcon = true,
      mode = "single",
      isHeader = false,
      ...rest
    },
    ref,
  ) => {
    const { isMobile } = useBreakpoint();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Defensive: Disallow undefined value in range mode
    React.useEffect(() => {
      if (mode === "range" && !value) {
        throw new Error("value is required in range mode");
      }
    }, [mode, value]);

    // Type narrowing helpers
    const isRangeMode = mode === "range";

    // Calculate defaultMonth
    const defaultMonth =
      isRangeMode && isDateRange(value)
        ? value.from ?? new Date()
        : !isRangeMode && value instanceof Date
          ? value
          : new Date();

    const [month, setMonth] = React.useState<Date>(defaultMonth);
    const [year, setYear] = React.useState<number>(defaultMonth.getFullYear());
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    // Type-safe handler for both single and range modes
    const handleDateSelect = (selected: Date | DateRange | undefined) => {
      if (!selected) return;

      if (!isRangeMode && selected instanceof Date) {
        const date = startOfDay(toDate(selected, { timeZone }));
        (onChange as (date: Date | undefined) => void)(date);
        setMonth(date);
        setYear(date.getFullYear());
        if (closeOnSelect) setIsPopoverOpen(false);
      } else if (isRangeMode && isDateRange(selected)) {
        (onChange as (range: DateRange | undefined) => void)(selected);
        if (closeOnSelect && selected.from && selected.to) {
          setIsPopoverOpen(false);
        }
      }
    };

    // Format the selected date(s)
    let formattedDate = "";
    if (!isRangeMode) {
      if (value instanceof Date) {
        formattedDate = formatInTimeZone(value, timeZone, "dd LLL, y");
      }
    } else if (isDateRange(value)) {
      if (value.from && value.to) {
        formattedDate = `${formatInTimeZone(
          value.from,
          timeZone,
          "dd LLL, y",
        )} - ${formatInTimeZone(value.to, timeZone, "dd LLL, y")}`;
      } else if (value.from) {
        formattedDate = formatInTimeZone(value.from, timeZone, "dd LLL, y");
      }
    }

    return (
      <div className={cn(className)}>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              {label && <Label htmlFor={id}>{label}</Label>}
              {children ?? (
                <button
                  type="button"
                  ref={ref}
                  className={cn(
                    "cursor-pointer bg-input w-full h-10 px-3 text-sm border border-border rounded-md flex items-center justify-start gap-[8px]",
                    !value && "text-muted-foreground",
                  )}
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  {...rest}
                >
                  {showIcon && <CalendarIcon className="h-4 w-4 opacity-50" />}
                  {formattedDate || (
                    <span className="text-neutral-400">{placeholder}</span>
                  )}
                </button>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {isHeader && (
              <Headers
                year={year}
                month={month}
                setMonth={setMonth}
                setYear={setYear}
                maxDate={maxDate}
                minDate={minDate}
                onChange={(d: any) => {
                  if (!isRangeMode) {
                    (onChange as (date: Date | undefined) => void)(d);
                  }
                }}
              />
            )}
            {mode === "single" ? (
              <Calendar
                mode="single"
                numberOfMonths={1}
                selected={value as Date | undefined}
                onSelect={
                  handleDateSelect as (selected: Date | undefined) => void
                }
                disabled={(date) => date > maxDate || date < minDate}
                month={month}
                onMonthChange={setMonth}
              />
            ) : (
              <Calendar
                mode="range"
                numberOfMonths={isMobile ? 1 : 2}
                selected={value as DateRange | undefined}
                onSelect={
                  handleDateSelect as (selected: DateRange | undefined) => void
                }
                disabled={(date) => date > maxDate || date < minDate}
                month={month}
                onMonthChange={setMonth}
              />
            )}
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

CDatePicker.displayName = "CDatePicker";

export default CDatePicker;
