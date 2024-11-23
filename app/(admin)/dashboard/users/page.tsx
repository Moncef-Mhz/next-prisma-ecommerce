import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import { GetAllUsers } from "@/actions/User";

const Users = async () => {
  const users = await GetAllUsers();
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
