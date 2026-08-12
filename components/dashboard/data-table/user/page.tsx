"use client";
import { useUsers } from "@/hooks";
import Loading from "@/app/loading";
import UserTable from "./user-table";
import { userColumns } from "./user-columns";

export default function DashboardUserTable() {
  const { data: usersResponse, isLoading } = useUsers();

  if (isLoading) {
    return <Loading />;
  }

  if (!usersResponse || !usersResponse.success || !usersResponse.data) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {usersResponse?.message ?? "Properties not found"}
        </p>
      </div>
    );
  }
  const users = usersResponse?.data?.users ?? [];

  return (
    <div className='p-4'>
      <UserTable columns={userColumns} data={users} />
    </div>
  );
}
