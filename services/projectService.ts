import { useMutation, useQuery } from "@tanstack/react-query";
import { Apis } from "./core";

export const useGetProjects = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  category?: string;
}) => {
  const { data, isLoading, refetch } = useQuery<
    IResponse<ICmsProjectListResponse>
  >({
    queryKey: ["projects", params],
    queryFn: () => Apis.projects.list(params),
  });

  return {
    projects: data?.data?.items || [],
    pagination: {
      total: data?.data?.total || 0,
      page: data?.data?.page || 1,
      limit: data?.data?.limit || 10,
      totalPages: data?.data?.totalPages || 0,
    },
    isLoading,
    refetch,
  };
};

export const useGetProjectDetail = (id: string) => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsProject>>({
    queryKey: ["project", id],
    queryFn: () => Apis.projects.get(id),
    enabled: !!id,
  });

  return {
    project: data?.data || null,
    isLoading,
    refetch,
  };
};

export const useCreateProject = () => {
  const mutation = useMutation({
    mutationFn: (payload: any) => Apis.projects.create(payload),
    meta: {
      successMsg: "Project created successfully",
      invalidatesQuery: [["projects"]],
      closeOverlay: true,
    },
  });

  return {
    createProject: mutation.mutate,
    createProjectAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useUpdateProject = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      Apis.projects.update(id, payload),
    meta: {
      successMsg: "Project updated successfully",
      invalidatesQuery: [["projects"], ["project"]],
      closeOverlay: true,
    },
  });

  return {
    updateProject: mutation.mutate,
    updateProjectAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useDeleteProject = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => Apis.projects.delete(id),
    meta: {
      successMsg: "Project deleted successfully",
      invalidatesQuery: [["projects"]],
    },
  });

  return {
    deleteProject: mutation.mutate,
    deleteProjectAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useToggleProjectPublish = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => Apis.projects.togglePublish(id),
    meta: {
      successMsg: "Project status updated successfully",
      invalidatesQuery: [["projects"], ["project"]],
    },
  });

  return {
    togglePublish: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
