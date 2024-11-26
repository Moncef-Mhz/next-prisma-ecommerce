"use client";

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
import { DeleteProduct } from "@/actions/Product";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Product } from "@/types/types";

interface ActionsCellProps {
  product: Product;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ product }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await DeleteProduct(product.id);
    toast({
      description: res?.success
        ? "Product deleted successfully"
        : "Error deleting product",
      action: (
        <ToastAction altText="refresh" onClick={() => router.refresh()}>
          Refresh
        </ToastAction>
      ),
    });
  };

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
        <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
