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
import { IDesenvolvedor, INivel } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { SelectWithSearch } from "./SelectWithSearch";
import { DatePicker } from "./DatePicker";

const formSchema = z.object({
  id: z.number().optional().nullable(),
  nome: z.string().min(3, {
    message: "Nome deve ter no mínimo 3 caracteres.",
  }),
  sexo: z.string().min(1, {
    message: "Sexo deve ser preenchido.",
  }),
  data_nascimento: z
    .date()
    .refine(
      (data) => {
        const now = new Date();
        const birth = new Date(data);

        if (birth > now) {
          return false;
        }

        return true;
      },
      { message: "Data de nascimento deve ser menor que a data atual." }
    )
    .nullable(),
  idade: z.number().min(1, {
    message: "Idade deve ser preenchida.",
  }),
  hobby: z.string().min(3, {
    message: "Hobby deve ter no mínimo 3 caracteres.",
  }),
  nivel_id: z.number().min(1, {
    message: "Nível deve ser preenchido.",
  }),
});

export function DevForm({ desenvolvedor }: { desenvolvedor?: IDesenvolvedor }) {
  const [loading, setLoading] = useState(false);
  const [niveis, setNiveis] = useState<INivel[]>([
    {
      id: 1,
      nivel: "Iniciante",
      n_desenvolvedores: 17,
    },
    {
      id: 2,
      nivel: "Junior",
      n_desenvolvedores: 25,
    },
    {
      id: 3,
      nivel: "Intermediário",
      n_desenvolvedores: 12,
    },
    {
      id: 4,
      nivel: "Pleno",
      n_desenvolvedores: 58,
    },
    {
      id: 5,
      nivel: "Pleno Sênior",
      n_desenvolvedores: 5,
    },
    {
      id: 6,
      nivel: "Sênior",
      n_desenvolvedores: 7,
    },
    {
      id: 7,
      nivel: "Master",
      n_desenvolvedores: 0,
    },
    {
      id: 8,
      nivel: "Especialista",
      n_desenvolvedores: 3,
    },
    {
      id: 9,
      nivel: "Guru",
      n_desenvolvedores: 1,
    },
    {
      id: 10,
      nivel: "Ninja",
      n_desenvolvedores: 1,
    },
  ]);
  const [defaultValues, setDefaultValues] = useState<IDesenvolvedor | null>(
    null
  );

  const dialogRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: null,
      nome: "",
      sexo: "",
      data_nascimento: null,
      idade: 0,
      hobby: "",
      nivel_id: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { id, nome, sexo, data_nascimento, idade, hobby, nivel_id } =
        values as IDesenvolvedor;

      setLoading(true);

      const data: IDesenvolvedor = {
        id,
        nome,
        sexo,
        data_nascimento: new Date(data_nascimento),
        idade,
        hobby,
        nivel_id,
      };

      console.log(data);

      dialogRef.current?.click();
      form.reset();

      toast.success("Novo desenvolvedor cadastrado!");
    } catch (error) {
      toast.error("Erro ao cadastrar novo desenvolvedor.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (desenvolvedor: IDesenvolvedor) => () => {
    form.reset(desenvolvedor);
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
              disabled={loading}
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
                  disabled={loading}
                  control={form.control}
                  name='sexo'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Sexo</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
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
                  disabled={loading}
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
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            key='nivel_id'
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* <div className='md:flex w-full md:space-x-2 max-sm:space-y-5'>
              <div className='flex-1'> */}
            <FormField
              disabled={loading}
              control={form.control}
              name='data_nascimento'
              render={({ field }) => (
                <FormItem className='flex-1 flex-col'>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    {/* <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className='mr-2 h-4 w-4' />
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Clique para selecionar</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              // onSelect={field.onChange}
                              onSelect={(date) => {
                                field.onChange(date);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover> */}
                    <DatePicker
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* </div> */}

            {/* <div className='flex-1'>
                <FormField
                  disabled={loading}
                  control={form.control}
                  name='idade'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='Idade' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div> */}

            <FormField
              disabled={loading}
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
