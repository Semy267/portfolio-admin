import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isValid } from "date-fns";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLabel(value: string, options: any[]) {
  return options.find((o) => o.value === value)?.label;
}

export const formattedDate = (
  date: string,
  formatting: string = "EEE dd MMM",
) => {
  const parsedDate = new Date(date);

  if (!date || !isValid(parsedDate)) {
    return date;
  }

  return format(parsedDate, formatting);
};

export function showMsg({ title, desc, action, type = "info" }: any) {
  const toastTypes: Record<NonNullable<any["type"]>, typeof toast.info> = {
    info: toast.info,
    success: toast.success,
    error: toast.error,
    loading: toast.loading,
  };

  toastTypes[type](title, {
    description: desc,
    action,
  });
}
