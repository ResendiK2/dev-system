"use client";

import { useState } from "react";

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

export default function Desenvolvedores() {
  const [data, setData] = useState<IDesenvolvedor[]>([
    {
      id: 1,
      nivel_id: 1,
      nome: "Carlos Silva",
      sexo: "M",
      data_nascimento: new Date("1985-03-25"),
      idade: 39,
      hobby:
        "Gosto de criar miniaturas de navios em garrafas, um hobby que exige muita paciência e precisão.",
      nivel: "Júnior",
    },
    {
      id: 2,
      nivel_id: 2,
      nome: "Maria Souza",
      sexo: "F",
      data_nascimento: new Date("1990-07-12"),
      idade: 33,
      hobby:
        "Amo escrever contos de ficção científica, explorando conceitos futurísticos e possibilidades alternativas.",
      nivel: "Pleno",
    },
    {
      id: 3,
      nivel_id: 3,
      nome: "José Lima",
      sexo: "M",
      data_nascimento: new Date("1978-11-05"),
      idade: 45,
      hobby:
        "Sou um entusiasta de maratonas de filmes clássicos, assistindo e discutindo sobre suas técnicas cinematográficas.",
      nivel: "Sênior",
    },
    {
      id: 4,
      nivel_id: 1,
      nome: "Ana Oliveira",
      sexo: "F",
      data_nascimento: new Date("1988-01-15"),
      idade: 36,
      hobby:
        "Pratico jardinagem urbana, transformando pequenos espaços em exuberantes jardins sustentáveis.",
      nivel: "Júnior",
    },
    {
      id: 5,
      nivel_id: 2,
      nome: "Bruno Almeida",
      sexo: "M",
      data_nascimento: new Date("1992-06-30"),
      idade: 31,
      hobby:
        "Adoro cozinhar pratos gourmet experimentais, combinando sabores e técnicas de diferentes culturas.",
      nivel: "Pleno",
    },
  ]);

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
        <TableComponent columns={columns} data={data} />
      </div>

      <Toaster position='top-right' />
    </div>
  );
}
