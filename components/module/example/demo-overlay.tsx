"use client";
import CButton from "@/components/shared/custome/c-button";
import CDialog from "@/components/shared/custome/c-dialog";
import CDrawer from "@/components/shared/custome/c-drawer";
import { useDialog } from "@/lib/hooks";

export default function DemoOverlay() {
  const confirmDialog = useDialog("ov_confirmation");

  const handleConfirmation = (isClose: boolean = false) => {
    confirmDialog.open({
      title: "Confirmation",
      isClose,
      message: "Are you sure want to delete your life?",
      onConfirmation: () => console.log("confirm"),
    });
  };
  const handleConfirmDisableInteraction = (isClose: boolean = false) => {
    confirmDialog.open({
      title: "Confirmation",
      isClose,
      disableOutsideInteraction: true,
      message: "Are you sure want to delete your life?",
      onConfirmation: () => console.log("confirm"),
    });
  };
  return (
    <div className="flex items-center justify-center gap-[8px] flex-wrap">
      <CButton
        title="Confirmation with x"
        onClick={() => handleConfirmation(true)}
        variant="secondary"
      />
      <CButton
        title="Confirmation without x"
        onClick={() => handleConfirmation(false)}
        variant="secondary"
      />

      <CButton
        title="Confirmation with x and disable outisde interaction"
        onClick={() => handleConfirmDisableInteraction(true)}
        variant="secondary"
      />
      <CButton
        title="Confirmation without x and disable outisde interaction"
        onClick={() => handleConfirmDisableInteraction(false)}
        variant="secondary"
      />
      <CDrawer
        trigger={
          <CButton
            title="using children and trigger inside comp"
            variant="secondary"
          />
        }
      >
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur cupidatat.
      </CDrawer>
      <CDialog
        title={<p>helo</p>}
        trigger={
          <CButton
            title="using children and trigger inside comp"
            variant="secondary"
          />
        }
      >
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur cupidatat.
      </CDialog>
    </div>
  );
}
