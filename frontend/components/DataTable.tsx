"use client";

import * as React from "react";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TextSelect } from "lucide-react";

import { Spinner } from "./Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableComponent({
  columns,
  data,
  isLoading,
}: {
  columns: ColumnDef<any>[];
  data: any[];
  isLoading?: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!table.getRowModel().rows?.length ? null : (
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>

      {!table.getRowModel().rows?.length ? (
        <div>
          {isLoading ? (
            <div className='flex-1 flex flex-col justify-center items-center my-20 space-y-2'>
              <Spinner />
              <p className='text-blue-600 text-lg'>Carregando...</p>
            </div>
          ) : (
            <div className='flex-1 flex flex-col justify-center items-center my-20 space-y-2'>
              <TextSelect className='h-12 w-12 text-blue-600' />

              <p className='text-blue-600 text-lg'>
                Nenhum registro encontrado
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
