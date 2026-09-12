import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CloseOverlay from "../close-overlay";
import { cn } from "@/lib/utils";

export default function CDrawer({
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
  return (
    <Drawer
      open={open}
      onOpenChange={onClose}
      dismissible={!disableOutsideInteraction}
    >
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        {title ? (
          <DrawerHeader>
            <DialogTitle
              className={classNameTitle}
              style={{ textAlign: titleAlign }}
            >
              {title}
            </DialogTitle>
            {isClose && <CloseOverlay />}
          </DrawerHeader>
        ) : (
          <VisuallyHidden asChild>
            <DialogTitle />
          </VisuallyHidden>
        )}
        <div
          className={cn(
            "max-h-[80vh] w-full max-w-xl mx-auto",
            isPadding ? "p-[16px]" : "p-0",
          )}
        >
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
