import { useMutation, useQuery } from "@tanstack/react-query";
import { Apis } from "./core";

export const useGetMedia = (params?: { search?: string }) => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsMedia[]>>({
    queryKey: ["media", params],
    queryFn: () => Apis.media.list(params),
  });

  return {
    media: (data?.data as ICmsMedia[]) || [],
    isLoading,
    refetch,
  };
};

export const useUploadMedia = () => {
  const mutation = useMutation({
    mutationFn: (formData: FormData) => Apis.media.upload(formData),
    meta: {
      successMsg: "Media uploaded successfully",
      invalidatesQuery: [["media"]],
    },
  });

  return {
    uploadMedia: mutation.mutate,
    uploadMediaAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export const useDeleteMedia = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => Apis.media.delete(id),
    meta: {
      successMsg: "Media deleted successfully",
      invalidatesQuery: [["media"]],
    },
  });

  return {
    deleteMedia: mutation.mutate,
    deleteMediaAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
