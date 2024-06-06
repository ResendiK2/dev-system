"use client";

import { useEffect, useState } from "react";

import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/sonner";
import { DevForm } from "../components/DevForm";

import { IDesenvolvedor } from "../utils/types";
import { TableComponent } from "@/components/DataTable";
import { columns } from "@/components/DevColumns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { DevService } from "@/services/DevService";

export default function Desenvolvedores() {
  const [data, setData] = useState<IDesenvolvedor[]>();

  useEffect(() => {
    DevService.getDevs().then((res: IDesenvolvedor[]) => setData(res));
  }, []);

  return (
    <div className='p-6 max-w-full mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Dev System</h1>

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
        <TableComponent columns={columns} data={data || []} />
      </div>

      <Toaster position='top-right' />
    </div>
  );
}
