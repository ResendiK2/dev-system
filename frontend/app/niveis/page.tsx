"use client";

import { useState } from "react";

import { TableComponent } from "@/components/DataTable";

import { Button } from "../../components/ui/button";
import { Toaster } from "../../components/ui/sonner";

import { INivel } from "../../utils/types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { columns } from "@/components/LevelColumns";

export default function Home() {
  // export interface INivel {
  //   id?: number;
  //   nivel: string;
  //   Desenvolvedor?: IDesenvolvedor[];
  // }

  const [data, setData] = useState<INivel[]>([
    {
      id: 1,
      nivel: "Iniciante",
      n_desenvolvedores: 17,
    },
    {
      id: 2,
      nivel: "Junior",
      n_desenvolvedores: 25,
    },
    {
      id: 3,
      nivel: "Intermediário",
      n_desenvolvedores: 12,
    },
    {
      id: 4,
      nivel: "Pleno",
      n_desenvolvedores: 58,
    },
    {
      id: 5,
      nivel: "Pleno Sênior",
      n_desenvolvedores: 5,
    },
    {
      id: 6,
      nivel: "Sênior",
      n_desenvolvedores: 7,
    },
    {
      id: 7,
      nivel: "Master",
      n_desenvolvedores: 0,
    },
    {
      id: 8,
      nivel: "Especialista",
      n_desenvolvedores: 3,
    },
    {
      id: 9,
      nivel: "Guru",
      n_desenvolvedores: 1,
    },
    {
      id: 10,
      nivel: "Ninja",
      n_desenvolvedores: 1,
    },
  ]);

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

        <div className='flex flex-1 justify-end items-center gap-2'></div>
      </div>

      <div className='border rounded-lg p-2'>
        <TableComponent columns={columns} data={data} />
      </div>

      <Toaster position='top-right' />
    </div>
  );
}
