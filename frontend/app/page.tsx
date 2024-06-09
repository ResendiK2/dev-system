"use client";

import { useEffect, useState } from "react";
import { debounce } from "lodash";

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

import { IDesenvolvedor } from "@/utils/types";
import { useDevs } from "@/hooks/useDevs";

export default function Desenvolvedores() {
  const DOCS_URL = `${process.env.API_URL || "http://localhost:3333"}/api/docs`;

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setQuery("");
    setInputValue("");
  }, []);

  const { data, isLoading } = useDevs({ page, query });

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
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold text-blue-600'>Dev System</h1>

        <a href={DOCS_URL} target='_blank'>
          <Button variant='outline'>Link para documentação</Button>
        </a>
      </div>

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
            value={inputValue}
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

      <Toaster richColors closeButton position='top-right' />
    </div>
  );
}
