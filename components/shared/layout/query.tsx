"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";
import { toast } from "sonner";
import store from "@/store";

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
    mutationCache: new MutationCache({
      onMutate: (_vars, mutation) => {
        if (!mutation.meta?.disableGlobalLoading && !mutation.meta?.silent) {
          store.getState().setLoading();
        }
      },
      onSuccess: (data, vars, _ctx, mutation) => {
        const { successMsg, invalidatesQuery, closeOverlay, silent } =
          mutation.meta ?? {};

        if (!silent && successMsg) {
          const msg =
            typeof successMsg === "function"
              ? successMsg(data, vars)
              : successMsg;
          if (msg) toast.success(msg);
        }

        if (invalidatesQuery) {
          const keys =
            typeof invalidatesQuery === "function"
              ? invalidatesQuery(data, vars)
              : invalidatesQuery;

          keys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: key, exact: false });
          });
        }

        if (closeOverlay) {
          store.getState().closeOverlay();
        }
      },
      onError: (err: any, vars, _ctx, mutation) => {
        if (mutation.meta?.silent) return;

        const apiMsg =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message;

        const fallback = mutation.meta?.errorMsg;
        const msg =
          (typeof fallback === "function" ? fallback(err, vars) : fallback) ||
          apiMsg ||
          "An error occurred";

        toast.error(msg);
      },
      onSettled: (_data, _error, _vars, _ctx, mutation) => {
        if (!mutation.meta?.disableGlobalLoading && !mutation.meta?.silent) {
          store.getState().clearLoading();
        }
      },
    }),
  });

  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Query({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
