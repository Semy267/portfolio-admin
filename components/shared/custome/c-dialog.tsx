import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CloseOverlay from "../close-overlay";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function CDialog({
  open,
  title,
  isClose,
  onClose,
  classNameTitle,
  titleAlign = "start",
  isPadding = true,
  disableOutsideInteraction = false,
  children,
  trigger,
}: IDialogDrawer) {
  const handleInteraction = (e: Event) => {
    if (disableOutsideInteraction) e.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(isPadding ? "p-[16px]" : "p-0")}
        onInteractOutside={handleInteraction}
        onEscapeKeyDown={handleInteraction}
        aria-describedby={typeof title || undefined}
      >
        {title ? (
          <DialogHeader>
            <DialogTitle
              className={classNameTitle}
              style={{ textAlign: titleAlign }}
            >
              {title}
            </DialogTitle>
            {isClose && <CloseOverlay />}
          </DialogHeader>
        ) : (
          <VisuallyHidden asChild>
            <DialogTitle />
          </VisuallyHidden>
        )}
        {!title && isClose && <CloseOverlay />}
        {children}
      </DialogContent>
    </Dialog>
  );
}
