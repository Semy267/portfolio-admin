import "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidatesQuery?:
        | QueryKey[]
        | ((data: any, variables: any) => QueryKey[]);
      successMsg?: string | ((data: any, variables: any) => string);
      errorMsg?: string | ((error: any, variables: any) => string);
      closeOverlay?: boolean;
      disableGlobalLoading?: boolean;
      silent?: boolean;
    };
  }
}
