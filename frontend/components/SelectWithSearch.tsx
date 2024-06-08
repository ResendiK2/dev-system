"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useLevels } from "@/hooks/useLevels";

import { INivel } from "@/utils/types";
interface IItems {
  label: string;
  value: string;
}

export function SelectWithSearch({
  value: initValue,
  onValueChange,
  disabled,
}: {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initValue);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setQuery("");
  }, []);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const { data } = useLevels({ query });

  const handleSearchChange = (e: string) => {
    setQuery(e);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
          disabled={disabled}
        >
          {data?.data?.find((nivel: INivel) => nivel.id == +value)?.nivel ??
            "Selecione..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[250px] p-0'>
        <Command>
          <CommandInput
            placeholder='Buscar...'
            value={query}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
            <CommandGroup>
              {data?.data?.map((nivel: INivel) => {
                const item: IItems = {
                  label: nivel.nivel,
                  value: String(nivel.id),
                };

                return (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      onValueChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
