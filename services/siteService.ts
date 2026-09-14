import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Apis } from "./core";
import store from "@/store";
import { showMsg } from "@/lib/utils";

export const useGetSiteSettings = () => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsSiteSettings>>({
    queryKey: ["site-settings"],
    queryFn: () => Apis.siteSettings.get(),
  });

  return {
    siteSettings: data?.data || null,
    isLoading,
    refetch,
  };
};

export const useUpdateSiteSettings = () => {
  const { setLoading, clearLoading } = store();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: Partial<ICmsSiteSettings>) =>
      Apis.siteSettings.update(payload),
    onMutate: () => {
      setLoading();
    },
    onSuccess: () => {
      showMsg({
        type: "success",
        title: "Site & SEO settings updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Failed to update site settings";
      showMsg({ type: "error", title: msg });
    },
    onSettled: () => {
      clearLoading();
    },
  });

  return {
    updateSiteSettings: mutation.mutate,
    updateSiteSettingsAsync: mutation.mutateAsync,
    isLoading: mutation.status === "pending",
    isSuccess: mutation.status === "success",
    isError: mutation.status === "error",
    error: mutation.error,
    reset: mutation.reset,
  };
};
