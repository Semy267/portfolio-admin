"use client";
import CTable from "@/components/shared/custome/c-table";
import { TABLE_COLUMN } from "@/lib/constants";
import { formattedDate } from "@/lib/utils";

export default function DemoTable() {
  return (
    <div>
      <CTable
        className="max-w-[40vw]"
        column={TABLE_COLUMN}
        colConfig={colConfig}
      />
      <CTable column={TABLE_COLUMN} colConfig={colConfig} />
    </div>
  );
}

const colConfig = [
  {
    header: "ID",
    render: (item: any) => <div>{item.id}</div>,
  },
  {
    header: "Title",
    render: (item: any) => <div className="min-w-[100px]">{item.title}</div>,
  },
  {
    header: "Status",
    render: (item: any) => <div className="min-w-[100px]">{item.status}</div>,
  },
  {
    header: "Assignee",
    render: (item: any) => <div>{item.assignee}</div>,
  },
  {
    header: "Priority",
    render: (item: any) => <div>{item.priority}</div>,
  },
  {
    header: "Created At",
    render: (item: any) => (
      <div className="min-w-[100px]">{formattedDate(item.createdAt)}</div>
    ),
  },
];
