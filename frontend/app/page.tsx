"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { Columns } from "@/components/DevColumns";
import { DevForm } from "../components/DevForm";
import { TableComponent } from "@/components/DataTable";
import { Toaster } from "../components/ui/sonner";

import { getDevs } from "@/api/desenvolvedores";
import { ICustomError } from "@/utils/types";

export default function Desenvolvedores() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ["devs", page, limit],
    queryFn: () => getDevs(page, limit),
  });

  useEffect(() => {
    if (!error) return;

    const customError = error as ICustomError;

    toast.error(
      customError?.response?.data?.error || "Erro ao buscar desenvolvedores"
    );
  }, [error]);

  return (
    <div className='p-6 max-w-full mx-auto space-y-4'>
      <h1 className='text-3xl font-bold text-blue-600'>Dev System</h1>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Desenvolvedores</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex flex-1 justify-between items-center gap-2'>
        <a href='/niveis'>
          <Button variant='outline'>Ver Niveis</Button>
        </a>

        <DevForm />
      </div>

      <div className='border rounded-lg p-2'>
        <TableComponent
          columns={Columns}
          data={data?.data ?? []}
          isLoading={isLoading}
        />
      </div>

      <Toaster position='top-right' />
    </div>
  );
}
