import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import CButton from "../custome/c-button";

export interface OvConfirmationProps {
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onConfirmation?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

export default function OvConfirmation({
  message = "Are you sure you want to proceed?",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onConfirmation,
  onCancel,
  onClose,
  variant = "secondary",
}: OvConfirmationProps) {
  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else if (onConfirmation) {
      onConfirmation();
    }
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <p className="text-sm">{message}</p>
      <div className="flex items-center justify-end gap-[8px]">
        <CButton
          title={cancelText}
          size="sm"
          variant="outline"
          onClick={handleCancel}
        />
        <CButton
          title={confirmText}
          size="sm"
          variant={variant}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}
