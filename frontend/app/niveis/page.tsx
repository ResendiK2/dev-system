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

export default function Home() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["devs", page],
    queryFn: () => getLevels({ page, query }),
  });

  useEffect(() => {
    if (!error) return;

    const customError = error as ICustomError;

    toast.error(customError?.response?.data?.error || "Erro ao buscar niveis");
  }, [error]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    setQuery("");
  }, []);

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
