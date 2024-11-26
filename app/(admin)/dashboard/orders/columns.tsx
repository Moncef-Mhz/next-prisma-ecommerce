"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowDown, ChevronDown, MoreHorizontal } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { Order, OrderStatusEnum } from "@/types/types";
import { useState } from "react";
import { DeleteOrder, UpdateOrderStatus } from "@/actions/Order";

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: "id",
    header: "Order Id",
    cell: ({ row }) => (
      <div className="flex items-center">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left  float-left"
        >
          status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="float-right">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-right font-medium capitalize">
          {date.toLocaleString("default", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDialogOpen, setDialogOpen] = useState(false);
      const order = row.original;
      const router = useRouter();
      const handleDialogOpen = () => setDialogOpen(true);

      return (
        <>
          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                Copy Order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDialogOpen}>
                Info
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 "
                onClick={async () => {
                  const res = await DeleteOrder(order.id);
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

          {/* Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>View products by ....</DialogDescription>
                <div className="space-y-2">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p className="flex gap-1">
                    <strong>Status:</strong>{" "}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none flex items-center">
                        {order.status} <ChevronDown size={20} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          Change Order Status
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {Object.values(OrderStatusEnum).map((status) => {
                          return (
                            <DropdownMenuItem
                              key={status}
                              onClick={async () => {
                                const res = await UpdateOrderStatus(
                                  status,
                                  order.id
                                );
                                if (res.success) {
                                  toast({
                                    description: res.success,
                                    action: (
                                      <ToastAction
                                        altText="refresh"
                                        onClick={() => router.refresh()}
                                      >
                                        refresh
                                      </ToastAction>
                                    ),
                                  });
                                }
                              }}
                            >
                              {status}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>City:</strong> {order.city}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
