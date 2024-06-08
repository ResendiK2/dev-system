"use client";

import { useEffect, useState } from "react";

import { debounce } from "lodash";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/Pagination";
import { TableComponent } from "@/components/DataTable";
import { Toaster } from "../components/ui/sonner";

import { getDevs } from "@/api/desenvolvedores";

import { ICustomError, IDesenvolvedor } from "@/utils/types";

export default function Desenvolvedores() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery("");
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["devs", page, query],
    queryFn: () => getDevs({ page, query }),
    staleTime: 300000,
  });

  useEffect(() => {
    if (error) {
      const customError = error as ICustomError;
      toast.error(
        customError?.response?.data?.error ||
          customError?.message ||
          "Erro ao buscar desenvolvedores"
      );
    }
  }, [error]);

  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    500
  );

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
        <div className='flex justify-end items-center ml-1 py-4'>
          <Input
            placeholder='Buscar...'
            className='max-w-sm'
            value={query}
            onChange={handleSearchChange}
          />
        </div>

        <TableComponent
          columns={Columns}
          data={(data?.data ?? []).map((dev: IDesenvolvedor) => ({
            ...dev,
            nivel: dev?.nivel?.nivel,
          }))}
          isLoading={isLoading}
        />

        <Pagination
          isLoading={isLoading}
          paginationData={data?.meta}
          setPage={setPage}
        />
      </div>

      <Toaster position='top-right' />
    </div>
  );
}
