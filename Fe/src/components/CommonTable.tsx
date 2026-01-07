/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Props } from "@/types/table.type";

const CommonTable = ({ columns, data, pagination }: Props) => {
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 0;

  return (
    <div className="space-y-4">
      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead className="text-center" key={index}>{col.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((record, rowIndex) => (
            <TableRow key={record.id || rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex} className="text-center">
                  {col.render
                    ? col.render(record[col.dataIndex], record, rowIndex)
                    : record[col.dataIndex]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      {pagination && (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={pagination.page === 1}
            onClick={() => pagination.onChange(pagination.page - 1)}
          >
            Prev
          </Button>

          <span className="text-sm">
            Page {pagination.page} / {totalPages}
          </span>

          <Button
            size="sm"
            variant="outline"
            disabled={pagination.page === totalPages}
            onClick={() => pagination.onChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommonTable;
