"use client";

import { useEffect, useState } from "react";

import { TableComponent } from "@/components/DataTable";

import { Button } from "../../components/ui/button";
import { Toaster } from "../../components/ui/sonner";

import { ICustomError } from "../../utils/types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LevelForm } from "@/components/LevelForm";
import { toast } from "sonner";
import { getLevels } from "@/api/niveis";
import { useQuery } from "@tanstack/react-query";
import { Columns } from "@/components/LevelColumns";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/Pagination";
import { debounce } from "lodash";

export default function Niveis() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery("");
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["niveis", page, query],
    queryFn: () => getLevels({ page, query }),
    staleTime: 300000,
  });

  useEffect(() => {
    if (error) {
      const customError = error as ICustomError;
      toast.error(
        customError?.response?.data?.error ||
          customError?.message ||
          "Erro ao buscar niveis"
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
      <h1 className='text-3xl font-bold'>Niveis</h1>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Desenvolvedores</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Niveis</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='md:flex justify-between items-center max-md:space-y-2 gap-2'>
        <a href='/'>
          <Button variant='outline'>Voltar para Desenvolvedores</Button>
        </a>

        <LevelForm />
      </div>

      <div className='border rounded-lg p-2'>
        <div className='flex justify-end items-center  ml-1 py-4'>
          <Input
            placeholder='Buscar...'
            className='max-w-sm'
            value={query}
            onChange={handleSearchChange}
          />
        </div>

        <TableComponent
          columns={Columns}
          data={data?.data ?? []}
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
