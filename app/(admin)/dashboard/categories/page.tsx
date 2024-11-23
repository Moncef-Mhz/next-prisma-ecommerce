import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import prisma from "@/lib/db";
import { GetAllCategories } from "@/actions/Category";

const CategoriesPage = async () => {
  const categories = await GetAllCategories();
  return (
    <div>
      <DataTable
        columns={columns}
        filterText="name"
        data={categories}
        createButton={true}
        createLink="categories/new"
      />
    </div>
  );
};
export default CategoriesPage;
