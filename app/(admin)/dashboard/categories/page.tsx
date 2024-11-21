import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import prisma from "@/lib/db";

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany();
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
