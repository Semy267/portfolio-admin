import { useMutation, useQuery } from "@tanstack/react-query";
import { Apis } from "./core";

export const useGetProfile = () => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsProfile>>({
    queryKey: ["profile"],
    queryFn: () => Apis.profile.get(),
  });

  return {
    profile: data?.data || null,
    isLoading,
    refetch,
  };
};

export const useUpdateProfile = () => {
  const mutation = useMutation({
    mutationFn: (payload: Partial<ICmsProfile>) => Apis.profile.update(payload),
    meta: {
      successMsg: "Profile updated successfully",
      invalidatesQuery: [["profile"]],
    },
  });

  return {
    updateProfile: mutation.mutate,
    updateProfileAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
