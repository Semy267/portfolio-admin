import store from "@/store";
import {
  OverlayCode,
  OverlayComponentPropsMap,
} from "@/components/shared/overlay-wrapper/registry";

export interface DialogOptions<T = any> extends IOverlayCommon {
  data?: T;
  [key: string]: any;
}

export function useDialog<K extends keyof OverlayComponentPropsMap>(
  defaultCode?: K | string,
  defaultOptions?: DialogOptions<
    K extends keyof OverlayComponentPropsMap ? OverlayComponentPropsMap[K] : any
  >,
) {
  const { setOpenOverlay, closeOverlay } = store();

  const openDialog = (targetCode: OverlayCode, options?: DialogOptions) => {
    const {
      title,
      isClose = true,
      data,
      classNameTitle,
      titleAlign,
      isPadding,
      disableOutsideInteraction,
      ...restProps
    } = options || {};

    setOpenOverlay({
      id: targetCode,
      title,
      isClose,
      classNameTitle,
      titleAlign,
      isPadding,
      disableOutsideInteraction,
      data: data !== undefined ? data : restProps,
    });
  };

  const boundOpen = (options?: DialogOptions) => {
    const code = defaultCode;
    if (!code) return;

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      data: {
        ...(typeof defaultOptions?.data === "object"
          ? defaultOptions?.data
          : {}),
        ...(typeof options?.data === "object"
          ? options?.data
          : options && !("data" in options)
            ? options
            : {}),
      },
    };

    openDialog(code, mergedOptions);
  };

  return {
    open: boundOpen,
    openDialog,
    close: closeOverlay,
    closeDialog: closeOverlay,
  };
}
