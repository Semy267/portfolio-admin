import * as React from "react";
import { useBreakpoint } from "@/lib/hooks";
import store from "@/store";
import CDrawer from "../custome/c-drawer";
import CDialog from "../custome/c-dialog";
import { OVERLAY_REGISTRY } from "./registry";

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

  const ActiveContent = id ? OVERLAY_REGISTRY[id] : null;

  const sharedProps = {
    open,
    title,
    isClose,
    onClose: closeOverlay,
    classNameTitle,
    titleAlign,
    isPadding,
    disableOutsideInteraction,
    children: ActiveContent ? (
      <ActiveContent {...overlay?.data} onClose={closeOverlay} />
    ) : null,
  };

  return isMobile ? <CDrawer {...sharedProps} /> : <CDialog {...sharedProps} />;
}
