"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  ICustomError,
  IDesenvolvedor,
  IGetNiveis,
  INivel,
} from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { SelectWithSearch } from "./SelectWithSearch";
import { getLevels } from "@/api/niveis";
import { createDev, updateDev } from "@/api/desenvolvedores";
import { format } from "date-fns";
import { Spinner } from "./Spinner";

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
  const [niveis, setNiveis] = useState<INivel[]>([]);
  const [query, setQuery] = useState("");

  const dialogRef = useRef<HTMLButtonElement>(null);

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
        values as IDesenvolvedor;

      setIsLoading(true);

      const data: IDesenvolvedor = {
        id,
        nome,
        sexo,
        data_nascimento: new Date(data_nascimento),
        hobby,
        nivel_id,
      };

      if (id) await updateDev(data);
      else await createDev(data);

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

  useEffect(() => {
    getLevels({ query })
      .then((data: IGetNiveis) => {
        setNiveis(data.data);
      })
      .catch((error) => {
        const customError = error as ICustomError;

        toast.error(
          customError?.response?.data?.error || "Erro ao buscar níveis"
        );
      });
  }, [query]);

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
                        items={niveis.map((nivel) => ({
                          label: nivel.nivel,
                          value: String(nivel.id),
                        }))}
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(Number(value))}
                        key='nivel_id'
                        disabled={isLoading}
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
