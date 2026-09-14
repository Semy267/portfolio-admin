"use client";

import React from "react";
import {
  useGetTechnologies,
  useDeleteTechnology,
} from "@/services/technologyService";
import CTable from "@/components/shared/custome/c-table";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/lib/hooks";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function TechnologiesPage() {
  const { technologies, isLoading } = useGetTechnologies();
  const { deleteTechnology } = useDeleteTechnology();

  const techDialog = useDialog("ov_technology_form");
  const confirmDialog = useDialog("ov_confirmation");

  const handleOpenCreate = () => {
    techDialog.open({
      title: "Add Technology",
      technology: null,
    });
  };

  const handleOpenEdit = (tech: ICmsTechnology) => {
    techDialog.open({
      title: "Edit Technology",
      technology: tech,
    });
  };

  const handleDelete = (tech: ICmsTechnology) => {
    confirmDialog.open({
      title: "Delete Technology",
      isClose: true,
      message: `Are you sure you want to delete ${tech.name}?`,
      onConfirmation: () => deleteTechnology(tech.id),
    });
  };

  const colConfig = [
    {
      header: "Name",
      render: (tech: ICmsTechnology) => (
        <span className="font-bold">{tech.name}</span>
      ),
    },
    {
      header: "Slug",
      render: (tech: ICmsTechnology) => (
        <span className="font-mono text-xs">{tech.slug}</span>
      ),
    },
    {
      header: "Category",
      render: (tech: ICmsTechnology) => (
        <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 border border-border bg-muted">
          {tech.category}
        </span>
      ),
    },
    {
      header: "Order",
      render: (tech: ICmsTechnology) => (
        <span className="font-mono text-sm">{tech.sortOrder}</span>
      ),
    },
    {
      header: "Actions",
      render: (tech: ICmsTechnology) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEdit(tech);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Edit Technology"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(tech);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Delete Technology"
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
          <h1 className="text-2xl font-black tracking-tight">Technologies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage programming languages, frameworks, and tools mapped to
            portfolio projects.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="border-2 border-border shadow-hard font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Technology
        </Button>
      </div>

      <div className="border-2 border-border bg-card shadow-hard overflow-hidden">
        <CTable
          column={technologies}
          colConfig={colConfig}
          isLoading={isLoading}
          className="w-full overflow-x-auto"
          classNameHeader="border-b-2 border-border bg-muted/60"
        />
      </div>
    </div>
  );
}
