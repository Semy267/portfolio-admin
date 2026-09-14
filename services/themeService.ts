import { useMutation, useQuery } from "@tanstack/react-query";
import { Apis } from "./core";

export const useGetTheme = () => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsTheme>>({
    queryKey: ["theme"],
    queryFn: () => Apis.theme.get(),
  });

  return {
    theme: data?.data || null,
    isLoading,
    refetch,
  };
};

export const useUpdateTheme = () => {
  const mutation = useMutation({
    mutationFn: (payload: Partial<ICmsTheme>) => Apis.theme.update(payload),
    meta: {
      successMsg: "Theme settings updated successfully",
      invalidatesQuery: [["theme"]],
    },
  });

  return {
    updateTheme: mutation.mutate,
    updateThemeAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
