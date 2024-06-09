"use client";

import { ArrowUpDown, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "./ui/button";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { LevelForm } from "./LevelForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { INivel } from "@/utils/types";

export const Columns: ColumnDef<INivel>[] = [
  {
    accessorKey: "nivel",
    header: ({ column }) => {
      return (
        <div className='flex flex-1 justify-center items-center w-full'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nível
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("nivel")}</div>,
  },
  {
    accessorKey: "n_desenvolvedores",
    header: () => {
      return (
        <div className='flex justify-center items-center w-full'>
          <Button variant='ghost'>Desenvolvedores vinculados</Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='text-center'>
        {row.getValue("n_desenvolvedores") || 0}
      </div>
    ),
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
      const nivel = row.original as INivel;

      return (
        <div className='flex justify-center items-center space-x-2'>
          <LevelForm nivel={nivel} />

          {nivel.n_desenvolvedores === 0 ? (
            <DeleteConfirmation id={nivel.id} type='nivel' />
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button variant='destructive' disabled>
                      <Trash className='w-4 h-4' />
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Não é possível excluir níveis com desenvolvedores
                    vinculados.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
];
