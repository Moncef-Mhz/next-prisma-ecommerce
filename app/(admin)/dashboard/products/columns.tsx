"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowDown, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

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
import { DeleteProduct } from "@/actions/Product";
import { useEffect, useState } from "react";
import { GetAllCategories } from "@/actions/Category";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { Category, Product } from "@/types/types";

export const columns: ColumnDef<Product>[] = [
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
    header: "Products Name",
    cell: ({ row }) => (
      <div className="flex items-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right  float-right"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "categoryId",
    header: () => <div className="float-right">Category</div>,
    cell: ({ row }) => {
      const [categories, setCategories] = useState<Category[]>([]);
      const categoryId = row.getValue("categoryId");

      useEffect(() => {
        const fetchCategories = async () => {
          const fetchedCategories = await GetAllCategories();
          setCategories(fetchedCategories);
        };

        fetchCategories();
      }, []);

      const category = categories.find((cat) => cat.id === categoryId);
      const categoryName = category ? category.name : "Unknown";

      return <div className="text-right font-medium">{categoryName}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
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
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy Product URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 "
              onClick={async () => {
                const res = await DeleteProduct(product.id);
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
