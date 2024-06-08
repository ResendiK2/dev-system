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

import { ICustomError, IMeta } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ICachedData {
  data: any[];
  meta: IMeta;
}

interface IItem {
  id: number;
}

export function DeleteConfirmation({
  id,
  type,
}: {
  id: number;
  type: "desenvolvedor" | "nivel";
}) {
  const [isLoading, setIsLoading] = useState(false);

  const dialogRef = useRef<HTMLButtonElement>(null);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: type === "desenvolvedor" ? deleteDev : deleteLevel,
    onSuccess: () => {
      let cached = queryClient.getQueryData<ICachedData>([
        type === "desenvolvedor" ? "devs" : "niveis",
        1,
        "",
      ]);

      if (!cached) return;

      let index = cached.data.findIndex((item: IItem) => item.id === id);

      if (index === -1) {
        Array.from({ length: cached.meta.last_page }).forEach((_, index) => {
          cached = queryClient.getQueryData([
            type === "desenvolvedor" ? "devs" : "niveis",
            index + 1,
            "",
          ]);

          if (!cached) return;

          const newData = cached.data.filter((item: IItem) => item.id !== id);

          queryClient.setQueryData(
            [type === "desenvolvedor" ? "devs" : "niveis", index + 1, ""],
            {
              ...cached,
              data: newData,
            }
          );
        });
      } else {
        queryClient.setQueryData(
          [type === "desenvolvedor" ? "devs" : "niveis", 1, ""],
          {
            ...cached,
            data: cached.data.filter((item: IItem) => item.id !== id),
          }
        );
      }
    },
  });

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      if (!id) throw new Error("Dados inválidos.");

      await mutateAsync(id);

      toast.success(`Sucesso ao excluir ${type}.`);
    } catch (error) {
      queryClient.invalidateQueries({
        queryKey: [type === "desenvolvedor" ? "devs" : "niveis"],
      });

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
