import { DeleteCategory } from "@/actions/Category";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Category } from "@/types/types";

const CategoryActions = ({ category }: { category: Category }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await DeleteCategory(category.id);
    toast({
      description: res?.success,
      action: (
        <ToastAction altText="refresh" onClick={() => router.refresh()}>
          refresh
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
          onClick={() => navigator.clipboard.writeText(category.id)}
        >
          Copy Product URL
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Info</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryActions;
