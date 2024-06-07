"use client";

import { useRef, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, PlusCircle } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { INivel } from "@/utils/types";
import { Spinner } from "./Spinner";
import { createLevel, updateLevel } from "@/api/niveis";

const formSchema = z.object({
  id: z.number().optional().nullable(),
  nivel: z.string().min(3, {
    message: "Nivel deve ter no mínimo 3 caracteres.",
  }),
});

export function LevelForm({ nivel }: { nivel?: INivel }) {
  const [isLoading, setIsLoading] = useState(false);

  const dialogRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: null,
      nivel: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { id, nivel } = values as INivel;

      setIsLoading(true);

      const data: INivel = {
        id,
        nivel,
      };

      if (id) await updateLevel(data);
      else await createLevel(data);

      toast.success(
        id
          ? `Nível atualizado com sucesso.`
          : `Nível ${nivel} cadastrado com sucesso.`
      );

      dialogRef.current?.click();
      form.reset();
    } catch (error) {
      toast.error("Erro ao cadastrar novo nível.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (nivel: INivel) => () => {
    form.reset(nivel);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!nivel?.id ? (
          <Button ref={dialogRef}>
            <PlusCircle className='w-4 h-4 mr-2' />
            Adicionar
          </Button>
        ) : (
          <Button
            variant='secondary'
            ref={dialogRef}
            onClick={handleEdit(nivel)}
          >
            <Edit className='w-4 h-4' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {nivel?.id ? "Editar Nível" : "Adicionar Nível"}
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              disabled={isLoading}
              control={form.control}
              name='nivel'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Nivel' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className='flex items-center mt-5'>
              {isLoading ? <Spinner /> : null}
              <DialogClose asChild>
                <Button
                  disabled={isLoading}
                  variant='outline'
                  onClick={() => form.reset()}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isLoading}>
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
