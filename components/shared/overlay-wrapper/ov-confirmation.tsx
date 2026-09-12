import store from "@/store";
import CButton from "../custome/c-button";

export default function OvConfirmation() {
  const { overlay, closeOverlay } = store();
  const onConfirmation = overlay?.data?.onConfirmation;

  return (
    <div className="flex flex-col gap-[12px]">
      <p>Are you sure want to delete your life?</p>
      <div className="flex items-center justify-end gap-[8px]">
        <CButton
          title="No"
          size={"sm"}
          variant={"outline"}
          onClick={closeOverlay}
        />
        <CButton
          title="Yes"
          size={"sm"}
          variant={"secondary"}
          onClick={onConfirmation}
        />
      </div>
    </div>
  );
}
