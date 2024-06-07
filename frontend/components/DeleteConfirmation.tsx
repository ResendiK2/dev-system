"use client";

import { useRef, useState } from "react";

import { toast } from "sonner";
import { Trash } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Spinner } from "./Spinner";

import { deleteDev } from "@/api/desenvolvedores";
import { deleteLevel } from "@/api/niveis";

import { ICustomError } from "@/utils/types";

export function DeleteConfirmation({ id, type }: { id: number; type: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const dialogRef = useRef<HTMLButtonElement>(null);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      if (!id) throw new Error("Dados inválidos.");

      switch (type) {
        case "desenvolvedor":
          await deleteDev(id);
          break;
        case "nivel":
          await deleteLevel(id);
          break;
        default:
          throw new Error("Tipo inválido.");
      }

      toast.success(`Sucesso ao excluir ${type}.`);
    } catch (error) {
      const customError = error as ICustomError;
      toast.error(
        customError?.response?.data?.error ||
          customError?.message ||
          `Erro ao excluir ${type}.`
      );
    } finally {
      setIsLoading(false);
      dialogRef.current?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' ref={dialogRef} title={`Excluir ${type}`}>
          <Trash className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Tem certeza que deseja excluir este {type}?</DialogTitle>
        <DialogFooter className='flex items-center mt-5'>
          {isLoading ? <Spinner /> : null}
          <DialogClose asChild>
            <Button disabled={isLoading} variant='outline'>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='submit'
            variant='destructive'
            disabled={isLoading}
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
