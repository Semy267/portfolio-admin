import { useMutation, useQuery } from "@tanstack/react-query";
import { Apis } from "./core";

export const useGetSocialLinks = () => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsSocialLink[]>>({
    queryKey: ["socialLinks"],
    queryFn: () => Apis.socialLinks.list(),
  });

  return {
    socialLinks: data?.data || [],
    isLoading,
    refetch,
  };
};

export const useCreateSocialLink = () => {
  const mutation = useMutation({
    mutationFn: (payload: any) => Apis.socialLinks.create(payload),
    meta: {
      successMsg: "Social link created successfully",
      invalidatesQuery: [["socialLinks"]],
      closeOverlay: true,
    },
  });

  return {
    createSocialLink: mutation.mutate,
    createSocialLinkAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useUpdateSocialLink = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      Apis.socialLinks.update(id, payload),
    meta: {
      successMsg: "Social link updated successfully",
      invalidatesQuery: [["socialLinks"]],
      closeOverlay: true,
    },
  });

  return {
    updateSocialLink: mutation.mutate,
    updateSocialLinkAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useDeleteSocialLink = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => Apis.socialLinks.delete(id),
    meta: {
      successMsg: "Social link deleted successfully",
      invalidatesQuery: [["socialLinks"]],
    },
  });

  return {
    deleteSocialLink: mutation.mutate,
    deleteSocialLinkAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
