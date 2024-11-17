import DataTable from "@/components/ui/data-table";
import prisma from "@/lib/db";
import { columns } from "./columns";

const Users = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className="container mx-auto py-5">
      <DataTable
        columns={columns}
        filterText="email"
        data={users}
        createButton={false}
        createLink=""
      />
    </div>
  );
};
export default Users;
