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

const formSchema = z.object({
  id: z.number().optional().nullable(),
  nivel: z.string().min(3, {
    message: "Nivel deve ter no mínimo 3 caracteres.",
  }),
});

export function LevelForm({ nivel }: { nivel?: INivel }) {
  const [loading, setLoading] = useState(false);

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

      setLoading(true);

      const data: INivel = {
        id,
        nivel,
      };

      console.log(data);

      dialogRef.current?.click();
      form.reset();

      toast.success("Novo nível cadastrado com sucesso.");
    } catch (error) {
      toast.error("Erro ao cadastrar novo nível.");
    } finally {
      setLoading(false);
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
              disabled={loading}
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

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={loading}
                  variant='outline'
                  onClick={() => form.reset()}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit' disabled={loading}>
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
