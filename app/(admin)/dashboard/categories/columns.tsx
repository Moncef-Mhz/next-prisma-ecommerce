"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/types";

import CategoryActions from "@/components/TableActions/CategoryActions";

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right  float-left capitalize"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="float-right">Created At</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium capitalize">
        {format(new Date(row.getValue("createdAt")), "yyyy-MM-dd HH:mm")}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="float-right">Updated At</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium capitalize">
        {format(new Date(row.getValue("updatedAt")), "yyyy-MM-dd HH:mm")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return <CategoryActions category={category} />;
    },
  },
];
