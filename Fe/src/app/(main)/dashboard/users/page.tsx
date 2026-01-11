/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CommonModel from "@/components/CommonModel";
import CommonTable from "@/components/CommonTable";
import { Button } from "@/components/ui/button";
import { getUser, removeUser } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
const UserPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [dataUserModel, setDataUserModel] = useState({});
  const queryClient = useQueryClient();
  const { data: response, isLoading } = useQuery({
    queryKey: ["get-user", page],
    queryFn: () => getUser({ page }),
    retry: false,
  });
  const { mutate } = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
  });
  const pagination = (response as any)?.pagination;
  const users = response?.data ?? [];
  if (isLoading) return <div>Loading...</div>;

  const columns = [
    {
      dataIndex: "id",
      title: "STT",
    },
    {
      dataIndex: "email",
      title: "Email",
    },
    {
      dataIndex: "role",
      title: "Role",
    },
    {
      dataIndex: "action",
      title: "Action",
      render: (_: any, record: any) => (
        <div className="flex gap-2 items-center justify-center text-amber-50">
          <Button
            className="bg-green-400 w-25 border-grebg-green-400 cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen);
              setDataUserModel(record);
            }}
          >
            Edit
          </Button>
          <Button
            className="bg-red-400 w-25 border-red-40 cursor-pointer"
            onClick={() => hanlderRemoveUser(record.id)}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];
  const handleChangePage = (page: number) => {
    queryClient.invalidateQueries({ queryKey: ["get-user", page] });
    router.push(`?page=${page}`);
  };

  const hanlderRemoveUser = (id: string) => {
    mutate({ id });
  };
  return (
    <div>
      <Button
        className="bg-green-400 w-25 border-grebg-green-400 cursor-pointer text-amber-50"
        onClick={() => setIsOpen(true)}
      >
        Add
      </Button>
      {users.length > 0 ? (
        <CommonTable
          columns={columns}
          data={users}
          pagination={{
            page: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            onChange: handleChangePage,
          }}
        />
      ) : null}

      <CommonModel isOpen={isOpen} setOpen={setIsOpen} data={dataUserModel} />
    </div>
  );
};

export default UserPage;
