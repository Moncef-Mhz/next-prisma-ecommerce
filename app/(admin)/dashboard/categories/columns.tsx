"use client";

import { DeleteCategory } from "@/actions/Category";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowDown, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Category } from "@/types/types";

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
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 float-right">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(category.id)}
            >
              Copy Product URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Info</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 "
              onClick={async () => {
                const res = await DeleteCategory(category.id);

                toast({
                  description: res?.success,
                  action: (
                    <ToastAction
                      altText="refresh"
                      onClick={() => router.refresh()}
                    >
                      refresh
                    </ToastAction>
                  ),
                });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
