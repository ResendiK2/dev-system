"use client";

import { useEffect, useState } from "react";
import { debounce } from "lodash";

import { Button } from "../../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Columns } from "@/components/LevelColumns";
import { Input } from "@/components/ui/input";
import { LevelForm } from "@/components/LevelForm";
import { Pagination } from "@/components/Pagination";
import { TableComponent } from "@/components/DataTable";
import { Toaster } from "../../components/ui/sonner";

import { useLevels } from "@/hooks/useLevels";

export default function Niveis() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setQuery("");
    setInputValue("");
  }, []);

  const { data, isLoading } = useLevels({ page, query });

  const debouncedSetQuery = debounce((value) => {
    setQuery(value);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetQuery(value);
  };

  return (
    <div className='p-6 max-w-full mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Níveis</h1>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Desenvolvedores</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Níveis</BreadcrumbPage>
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
        <div className='flex justify-end items-center ml-1 py-4'>
          <Input
            placeholder='Buscar...'
            className='max-w-sm'
            value={inputValue}
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

      <Toaster richColors closeButton position='top-right' />
    </div>
  );
}
