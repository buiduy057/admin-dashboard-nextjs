"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const UserPage = () => {
  const data = [
    { id: 1, name: "Admin", email: "admin@mail.com", role: "ADMIN" },
    { id: 2, name: "Editor", email: "editor@mail.com", role: "EDITOR" },
    { id: 3, name: "User", email: "user@mail.com", role: "USER" },
  ];
  const columns = [
    {
      dataIndex: "id",
      title: "STT",
    },
    {
      dataIndex: "name",
      title: "Name",
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
    },
  ];
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column,index) => (
              <TableHead key={index}>{column.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPage;
