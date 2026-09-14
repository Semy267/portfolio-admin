"use client";

import React from "react";
import {
  useGetExperiences,
  useDeleteExperience,
} from "@/services/experienceService";
import CTable from "@/components/shared/custome/c-table";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/lib/hooks";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { formattedDate } from "@/lib/utils";

export default function ExperiencePage() {
  const { experiences, isLoading } = useGetExperiences();
  const { deleteExperience } = useDeleteExperience();

  const expDialog = useDialog("ov_experience_form");
  const confirmDialog = useDialog("ov_confirmation");

  const handleOpenCreate = () => {
    expDialog.open({
      title: "Add Experience",
      experience: null,
    });
  };

  const handleOpenEdit = (exp: ICmsExperience) => {
    expDialog.open({
      title: "Edit Experience",
      experience: exp,
    });
  };

  const handleDelete = (exp: ICmsExperience) => {
    confirmDialog.open({
      title: "Delete Experience",
      isClose: true,
      message: `Are you sure you want to delete ${exp.title} at ${exp.organization}?`,
      onConfirmation: () => deleteExperience(exp.id),
    });
  };

  const colConfig = [
    {
      header: "Role & Company",
      render: (exp: ICmsExperience) => (
        <div>
          <div className="font-bold">{exp.title}</div>
          <p className="text-xs text-muted-foreground font-medium">
            {exp.organization}
          </p>
        </div>
      ),
    },
    {
      header: "Period",
      render: (exp: ICmsExperience) => (
        <span className="inline-flex items-center gap-1 font-mono text-xs">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          {formattedDate(exp.startDate, "MMM yyyy")} —{" "}
          {exp.endDate ? formattedDate(exp.endDate, "MMM yyyy") : "Present"}
        </span>
      ),
    },
    {
      header: "Order",
      render: (exp: ICmsExperience) => (
        <span className="font-mono text-sm">{exp.sortOrder}</span>
      ),
    },
    {
      header: "Actions",
      render: (exp: ICmsExperience) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEdit(exp);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Edit Experience"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(exp);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Delete Experience"
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
          <h1 className="text-2xl font-black tracking-tight">
            Work Experience
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Maintain your career timeline, organizations, responsibilities, and
            milestones.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="border-2 border-border shadow-hard font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      <div className="border-2 border-border bg-card shadow-hard overflow-hidden">
        <CTable
          column={experiences}
          colConfig={colConfig}
          isLoading={isLoading}
          className="w-full overflow-x-auto"
          classNameHeader="border-b-2 border-border bg-muted/60"
        />
      </div>
    </div>
  );
}
