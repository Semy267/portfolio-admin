"use client";

import React from "react";
import { useGetSkills, useDeleteSkill } from "@/services/skillService";
import CTable from "@/components/shared/custome/c-table";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/lib/hooks";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

export default function SkillsPage() {
  const { skills, isLoading } = useGetSkills();
  const { deleteSkill } = useDeleteSkill();

  const skillDialog = useDialog("ov_skill_form");
  const confirmDialog = useDialog("ov_confirmation");

  const handleOpenCreate = () => {
    skillDialog.open({
      title: "Add Skill",
      skill: null,
    });
  };

  const handleOpenEdit = (skill: ICmsSkill) => {
    skillDialog.open({
      title: "Edit Skill",
      skill,
    });
  };

  const handleDelete = (skill: ICmsSkill) => {
    confirmDialog.open({
      title: "Delete Skill",
      isClose: true,
      message: `Are you sure you want to delete "${skill.name}"?`,
      onConfirmation: () => deleteSkill(skill.id),
    });
  };

  const colConfig = [
    {
      header: "Name",
      render: (skill: ICmsSkill) => (
        <span className="font-bold">{skill.name}</span>
      ),
    },
    {
      header: "Category",
      render: (skill: ICmsSkill) => (
        <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 border border-border bg-muted">
          {skill.category}
        </span>
      ),
    },
    {
      header: "Order",
      render: (skill: ICmsSkill) => (
        <span className="font-mono text-sm">{skill.sortOrder}</span>
      ),
    },
    {
      header: "Status",
      render: (skill: ICmsSkill) => (
        <span
          className={`inline-flex items-center gap-1 text-xs font-mono font-bold uppercase px-2 py-0.5 border border-border ${
            skill.visible
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {skill.visible ? (
            <Eye className="w-3 h-3" />
          ) : (
            <EyeOff className="w-3 h-3" />
          )}
          {skill.visible ? "Visible" : "Hidden"}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (skill: ICmsSkill) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEdit(skill);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Edit Skill"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(skill);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Delete Skill"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Skills</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Highlight core competencies, design practices, and domain
            specializations.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="border-2 border-border shadow-hard font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      <div className="border-2 border-border bg-card shadow-hard overflow-hidden">
        <CTable
          column={skills}
          colConfig={colConfig}
          isLoading={isLoading}
          className="w-full overflow-x-auto"
          classNameHeader="border-b-2 border-border bg-muted/60"
        />
      </div>
    </div>
  );
}
