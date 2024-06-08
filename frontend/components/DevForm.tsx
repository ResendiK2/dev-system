"use client";

import { useRef, useState } from "react";

import { Edit, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectWithSearch } from "./SelectWithSearch";
import { Spinner } from "./Spinner";
import { Textarea } from "./ui/textarea";

import { createDev, updateDev } from "@/api/desenvolvedores";

import {
  IDesenvolvedor,
  IDesenvolvedorBody,
  IGetDesenvolvedores,
} from "@/utils/types";

const formSchema = z.object({
  id: z.number().optional().nullable(),
  nome: z.string().min(3, {
    message: "Nome deve ter no mínimo 3 caracteres.",
  }),
  sexo: z.string().min(1, {
    message: "Sexo deve ser preenchido.",
  }),
  data_nascimento: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Data de nascimento inválida.",
    })
    .refine((value) => new Date(value) >= new Date("1900-01-01"), {
      message: "Data de nascimento deve ser maior que 01/01/1900.",
    })
    .refine((value) => new Date(value) <= new Date(), {
      message: "Data de nascimento deve ser menor que a data atual.",
    }),
  hobby: z.string().min(3, {
    message: "Hobby deve ter no mínimo 3 caracteres.",
  }),
  nivel_id: z.number().min(1, {
    message: "Nível deve ser preenchido.",
  }),
});

export function DevForm({ desenvolvedor }: { desenvolvedor?: IDesenvolvedor }) {
  const [isLoading, setIsLoading] = useState(false);

  const dialogRef = useRef<HTMLButtonElement>(null);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: desenvolvedor?.id ? updateDev : createDev,
    onSuccess: (data) => {
      let cached = queryClient.getQueryData<IGetDesenvolvedores>([
        "devs",
        1,
        "",
      ]);

      if (!cached) return;

      if (!desenvolvedor?.id) {
        if (cached.meta.total < cached.meta.per_page) {
          const newData: IDesenvolvedor[] = cached.data;
          newData.push(data);

          queryClient.setQueryData<IGetDesenvolvedores>(["devs", 1, ""], {
            ...cached,
            data: newData,
          });

          return;
        }

        cached = queryClient.getQueryData<IGetDesenvolvedores>([
          "devs",
          cached.meta.last_page,
          "",
        ]);

        if (!cached) return;

        if (cached.meta.total == cached.meta.per_page) return;

        const newData: IDesenvolvedor[] = cached.data;

        newData.push(data);

        queryClient.setQueryData<IGetDesenvolvedores>(
          ["devs", cached.meta.last_page, ""],
          {
            ...cached,
            data: newData,
          }
        );

        return;
      }

      Array.from({ length: cached.meta.last_page }).forEach((_, index) => {
        cached = queryClient.getQueryData<IGetDesenvolvedores>([
          "devs",
          index + 1,
          "",
        ]);

        if (!cached) return;

        const newData = cached.data.map((dev) =>
          dev.id === data.id ? data : dev
        );

        queryClient.setQueryData<IGetDesenvolvedores>(["devs", index + 1, ""], {
          ...cached,
          data: newData,
        });
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: null,
      nome: "",
      sexo: "",
      data_nascimento: format(new Date(), "yyyy-MM-dd"),
      hobby: "",
      nivel_id: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { id, nome, sexo, data_nascimento, hobby, nivel_id } =
        values as IDesenvolvedorBody;

      setIsLoading(true);

      const data: IDesenvolvedorBody = {
        id,
        nome,
        sexo,
        data_nascimento: new Date(`${data_nascimento}T12:00:00`),
        hobby,
        nivel_id,
      };

      await mutateAsync(data);

      toast.success(
        id
          ? "Desenvolvedor atualizado com sucesso!"
          : "Novo desenvolvedor cadastrado!"
      );

      dialogRef.current?.click();
      form.reset();
    } catch (error) {
      toast.error("Erro ao cadastrar novo desenvolvedor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (desenvolvedor: IDesenvolvedor) => () => {
    form.reset({
      ...desenvolvedor,
      data_nascimento: format(
        new Date(desenvolvedor.data_nascimento),
        "yyyy-MM-dd"
      ),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!desenvolvedor?.id ? (
          <Button ref={dialogRef}>
            <PlusCircle className='w-4 h-4 mr-2' />
            Adicionar
          </Button>
        ) : (
          <Button
            variant='secondary'
            ref={dialogRef}
            onClick={handleEdit(desenvolvedor)}
          >
            <Edit className='w-4 h-4' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {desenvolvedor?.id
            ? "Editar Desenvolvedor"
            : "Adicionar Desenvolvedor"}
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              disabled={isLoading}
              control={form.control}
              name='nome'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Nome' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='md:flex w-full md:space-x-2 max-sm:space-y-5'>
              <div className='flex-1'>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='sexo'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Sexo</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isLoading}
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Selecione seu sexo' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='M'>Masculino</SelectItem>
                            <SelectItem value='F'>Feminino</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex-1'>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='data_nascimento'
                  render={({ field }) => (
                    <FormItem className='flex-1 flex-col'>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          placeholder='Data de Nascimento'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              disabled={isLoading}
              control={form.control}
              name='nivel_id'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Nível</FormLabel>
                  <div>
                    <FormControl>
                      <SelectWithSearch
                        key='nivel_id'
                        disabled={isLoading}
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(Number(value))}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              disabled={isLoading}
              control={form.control}
              name='hobby'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hobbies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Conte-nos um pouco sobre seus hobbies'
                      {...field}
                    />
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
