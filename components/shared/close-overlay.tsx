import { IoMdClose } from "react-icons/io";
import store from "@/store";
import { cn } from "@/lib/utils";

export default function CloseOverlay({ className }: { className?: string }) {
  const { closeOverlay: closeDialog } = store();

  return (
    <button
      type="button"
      onClick={closeDialog}
      className={cn("absolute right-4 top-3", className)}
    >
      <IoMdClose size={20} />
    </button>
  );
}
