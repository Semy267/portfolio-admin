import { useMutation, useQuery } from "@tanstack/react-query";
import { Apis } from "./core";

export const useGetTechnologies = () => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsTechnology[]>>({
    queryKey: ["technologies"],
    queryFn: () => Apis.technologies.list(),
  });

  return {
    technologies: data?.data || [],
    isLoading,
    refetch,
  };
};

export const useGetTechnologyDetail = (id: string) => {
  const { data, isLoading } = useQuery<IResponse<ICmsTechnology>>({
    queryKey: ["technology", id],
    queryFn: () => Apis.technologies.get(id),
    enabled: !!id,
  });

  return {
    technology: data?.data || null,
    isLoading,
  };
};

export const useCreateTechnology = () => {
  const mutation = useMutation({
    mutationFn: (payload: any) => Apis.technologies.create(payload),
    meta: {
      successMsg: "Technology created successfully",
      invalidatesQuery: [["technologies"]],
      closeOverlay: true,
    },
  });

  return {
    createTechnology: mutation.mutate,
    createTechnologyAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useUpdateTechnology = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      Apis.technologies.update(id, payload),
    meta: {
      successMsg: "Technology updated successfully",
      invalidatesQuery: [["technologies"], ["technology"]],
      closeOverlay: true,
    },
  });

  return {
    updateTechnology: mutation.mutate,
    updateTechnologyAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useDeleteTechnology = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => Apis.technologies.delete(id),
    meta: {
      successMsg: "Technology deleted successfully",
      invalidatesQuery: [["technologies"]],
    },
  });

  return {
    deleteTechnology: mutation.mutate,
    deleteTechnologyAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
