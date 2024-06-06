"use client";

import { useEffect, useState } from "react";

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
import { LevelService } from "@/services/LevelsService";

export default function Home() {
  const [data, setData] = useState<INivel[]>();

  useEffect(() => {
    LevelService.getLevels().then((res: INivel[]) => setData(res));
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

        <div className='flex flex-1 justify-end items-center gap-2'></div>
      </div>

      <div className='border rounded-lg p-2'>
        <TableComponent columns={columns} data={data || []} />
      </div>

      <Toaster position='top-right' />
    </div>
  );
}
