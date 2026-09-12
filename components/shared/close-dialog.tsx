import { IoMdClose } from "react-icons/io";
import store from "@/store";
import { cn } from "@/lib/utils";

export default function CloseOverlay({ className }: { className?: string }) {
  const { closeOverlay } = store();

  return (
    <button
      type="button"
      onClick={closeOverlay}
      className={cn("absolute right-4 top-4", className)}
    >
      <IoMdClose size={20} />
    </button>
  );
}
