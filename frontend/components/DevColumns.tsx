"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { IDesenvolvedor } from "@/utils/types";
import { format } from "date-fns";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { DevForm } from "./DevForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Columns: ColumnDef<IDesenvolvedor>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <div className='flex flex-1 justify-center items-center w-full'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "nivel",
    header: ({ column }) => {
      return (
        <div className='flex flex-1 justify-center items-center w-full'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nivel
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue("nivel")}</div>
    ),
  },
  {
    accessorKey: "sexo",
    header: ({ column }) => {
      return (
        <div className='flex flex-1 justify-center items-center w-full'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sexo
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='text-center'>
        {row.getValue("sexo") == "M" ? "Masculino" : "Feminino"}
      </div>
    ),
  },
  {
    accessorKey: "data_nascimento",
    header: ({ column }) => {
      return (
        <div className='flex flex-1 justify-center items-center w-full'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de nascimento
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='text-center'>
          {row.getValue("data_nascimento")
            ? format(row.getValue("data_nascimento"), "dd/MM/yyyy")
            : "Data não informada"}
        </div>
      );
    },
  },
  {
    accessorKey: "idade",
    header: ({ column }) => {
      return (
        <div className='flex flex-1 justify-center items-center w-full'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Idade
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue("idade")} Ano(s)</div>
    ),
  },
  {
    accessorKey: "hobby",
    header: ({ column }) => {
      return (
        <div className='flex flex-1 justify-center items-center w-full'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hobby
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const hobbies = (row.getValue("hobby") as string) || "";

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex justify-center items-center'>
                <Button variant='ghost' className='font-normal'>
                  {hobbies.length > 15
                    ? `${(hobbies || "").slice(
                        0,
                        15
                      )}... (Pare o mouse para ver mais)`
                    : hobbies ?? "Hobbies não informados"}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{hobbies}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className='flex justify-center items-center w-full'>
          <Button variant='ghost'>Ações</Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const desenvolvedor = row.original as IDesenvolvedor;

      return (
        <div className='flex justify-center items-center space-x-2'>
          <DevForm desenvolvedor={desenvolvedor} />

          <DeleteConfirmation id={desenvolvedor.id} type='desenvolvedor' />
        </div>
      );
    },
  },
];
