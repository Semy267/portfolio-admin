import { useMutation, useQuery } from "@tanstack/react-query";
import { Apis } from "./core";

export const useGetExperiences = () => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsExperience[]>>({
    queryKey: ["experiences"],
    queryFn: () => Apis.experiences.list(),
  });

  return {
    experiences: data?.data || [],
    isLoading,
    refetch,
  };
};

export const useCreateExperience = () => {
  const mutation = useMutation({
    mutationFn: (payload: any) => Apis.experiences.create(payload),
    meta: {
      successMsg: "Experience created successfully",
      invalidatesQuery: [["experiences"]],
      closeOverlay: true,
    },
  });

  return {
    createExperience: mutation.mutate,
    createExperienceAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useUpdateExperience = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      Apis.experiences.update(id, payload),
    meta: {
      successMsg: "Experience updated successfully",
      invalidatesQuery: [["experiences"]],
      closeOverlay: true,
    },
  });

  return {
    updateExperience: mutation.mutate,
    updateExperienceAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useDeleteExperience = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => Apis.experiences.delete(id),
    meta: {
      successMsg: "Experience deleted successfully",
      invalidatesQuery: [["experiences"]],
    },
  });

  return {
    deleteExperience: mutation.mutate,
    deleteExperienceAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
