import * as React from "react";
import { useBreakpoint } from "@/lib/hooks";
import store from "@/store";
import OvConfirmation from "./ov-confirmation";
import CDrawer from "../custome/c-drawer";
import CDialog from "../custome/c-dialog";

export default function OverlayWrapper() {
  const { isMobile } = useBreakpoint();
  const { overlay, closeOverlay } = store();
  const id = overlay?.id;
  const title = overlay?.title;
  const isClose = overlay?.isClose;
  const open = overlay?.open || false;
  const isPadding = overlay?.isPadding ?? true;
  const classNameTitle = overlay?.classNameTitle;
  const titleAlign = overlay?.titleAlign || "start";
  const disableOutsideInteraction = overlay?.disableOutsideInteraction || false;

  const Content = () => {
    switch (id) {
      case "CONFRIMATION":
        return <OvConfirmation />;
    }
  };

  const sharedProps = {
    open,
    title,
    isClose,
    onClose: closeOverlay,
    classNameTitle,
    titleAlign,
    isPadding,
    disableOutsideInteraction,
    children: <Content />,
  };

  return isMobile ? <CDrawer {...sharedProps} /> : <CDialog {...sharedProps} />;
}
