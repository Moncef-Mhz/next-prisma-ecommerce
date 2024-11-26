import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { DeleteOrder, UpdateOrderStatus } from "@/actions/Order";
import { Order, OrderStatusEnum } from "@/types/types";

const OrderActions = ({ order }: { order: Order }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
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
          <DropdownMenuItem onClick={handleDialogOpen}>Info</DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
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
                <strong>Status:</strong>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none flex items-center">
                    {order.status} <ChevronDown size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Change Order Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Object.values(OrderStatusEnum).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={async () => {
                          const res = await UpdateOrderStatus(status, order.id);
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
                    ))}
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
};

export default OrderActions;
