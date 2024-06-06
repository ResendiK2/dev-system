"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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

export const columns: ColumnDef<IDesenvolvedor>[] = [
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
    cell: ({ row }) => (
      <div className='text-center'>
        {format(row.getValue("data_nascimento"), "dd/MM/yyyy")}
      </div>
    ),
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
      const hobbies = row.getValue("hobby") as string;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex justify-center items-center'>
                <Button variant='ghost' className='font-normal'>
                  {hobbies.slice(0, 15) + "... (Pare o mouse para ver mais)"}
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
          <DeleteConfirmation id={+row.id} type='desenvolvedor' />

          <DevForm desenvolvedor={desenvolvedor} />
        </div>
      );
    },
  },
];
