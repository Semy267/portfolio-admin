import { useMutation, useQuery } from "@tanstack/react-query";
import { Apis } from "./core";

export const useGetSkills = () => {
  const { data, isLoading, refetch } = useQuery<IResponse<ICmsSkill[]>>({
    queryKey: ["skills"],
    queryFn: () => Apis.skills.list(),
  });

  return {
    skills: data?.data || [],
    isLoading,
    refetch,
  };
};

export const useCreateSkill = () => {
  const mutation = useMutation({
    mutationFn: (payload: any) => Apis.skills.create(payload),
    meta: {
      successMsg: "Skill created successfully",
      invalidatesQuery: [["skills"]],
      closeOverlay: true,
    },
  });

  return {
    createSkill: mutation.mutate,
    createSkillAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useUpdateSkill = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      Apis.skills.update(id, payload),
    meta: {
      successMsg: "Skill updated successfully",
      invalidatesQuery: [["skills"]],
      closeOverlay: true,
    },
  });

  return {
    updateSkill: mutation.mutate,
    updateSkillAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useDeleteSkill = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => Apis.skills.delete(id),
    meta: {
      successMsg: "Skill deleted successfully",
      invalidatesQuery: [["skills"]],
    },
  });

  return {
    deleteSkill: mutation.mutate,
    deleteSkillAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
