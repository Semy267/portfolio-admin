"use client";

import React from "react";
import {
  useGetSocialLinks,
  useDeleteSocialLink,
} from "@/services/socialLinkService";
import CTable from "@/components/shared/custome/c-table";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/lib/hooks";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

export default function SocialLinksPage() {
  const { socialLinks, isLoading } = useGetSocialLinks();
  const { deleteSocialLink } = useDeleteSocialLink();

  const socialDialog = useDialog("ov_social_link_form");
  const confirmDialog = useDialog("ov_confirmation");

  const handleOpenCreate = () => {
    socialDialog.open({
      title: "Add Social Link",
      socialLink: null,
    });
  };

  const handleOpenEdit = (link: ICmsSocialLink) => {
    socialDialog.open({
      title: "Edit Social Link",
      socialLink: link,
    });
  };

  const handleDelete = (link: ICmsSocialLink) => {
    confirmDialog.open({
      title: "Delete Social Link",
      isClose: true,
      message: `Are you sure you want to delete ${link.label}?`,
      onConfirmation: () => deleteSocialLink(link.id),
    });
  };

  const colConfig = [
    {
      header: "Platform & Label",
      render: (link: ICmsSocialLink) => (
        <div>
          <span className="font-bold">{link.label}</span>
          <span className="ml-2 text-xs font-mono uppercase text-muted-foreground">
            ({link.platform})
          </span>
        </div>
      ),
    },
    {
      header: "Destination URL",
      render: (link: ICmsSocialLink) => (
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs hover:underline text-primary"
        >
          {link.url}
          <ExternalLink className="w-3 h-3" />
        </a>
      ),
    },
    {
      header: "Order",
      render: (link: ICmsSocialLink) => (
        <span className="font-mono text-sm">{link.sortOrder}</span>
      ),
    },
    {
      header: "Actions",
      render: (link: ICmsSocialLink) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEdit(link);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Edit Link"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(link);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Delete Link"
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
          <h1 className="text-2xl font-black tracking-tight">Social Links</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure external profile links (GitHub, LinkedIn, X, etc.) visible
            in portfolio headers and footers.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="border-2 border-border shadow-hard font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </Button>
      </div>

      <div className="border-2 border-border bg-card shadow-hard overflow-hidden">
        <CTable
          column={socialLinks}
          colConfig={colConfig}
          isLoading={isLoading}
          className="w-full overflow-x-auto"
          classNameHeader="border-b-2 border-border bg-muted/60"
        />
      </div>
    </div>
  );
}
