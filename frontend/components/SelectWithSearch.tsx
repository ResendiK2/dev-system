// import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import PropTypes from "prop-types";

// interface SelectItems {
//   label: string;
//   value: string;
// }

// export function SelectWithSearch({
//   items,
//   value,
//   onValueChange,
// }: {
//   items: SelectItems[];
//   value: string;
//   onValueChange: (value: string) => void;
// }) {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState<string>(value);

//   console.log("items:", items);
//   console.log("value:", value);

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant='outline'
//           role='combobox'
//           aria-expanded={open}
//           className='w-[200px] justify-between'
//         >
//           {selectedValue
//             ? items.find((item: SelectItems) => item.value === selectedValue)
//                 ?.label
//             : "Selecione..."}
//           <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className='w-[200px] p-0'>
//         <Command>
//           <CommandInput placeholder='Buscar...' />
//           {items && items.length > 0 ? (
//             <CommandGroup>
//               {items.map((item: SelectItems) => (
//                 <CommandItem
//                   key={item?.value}
//                   value={item?.value}
//                   onSelect={(currentValue) => {
//                     setSelectedValue(
//                       currentValue === selectedValue ? "" : currentValue
//                     );
//                     onValueChange(currentValue);
//                     setOpen(false);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       selectedValue === item?.value
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                   {item?.label}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           ) : (
//             <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
//           )}
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

// SelectWithSearch.defaultProps = {
//   items: [],
// };

// SelectWithSearch.propTypes = {
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       value: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   value: PropTypes.string.isRequired,
//   onValueChange: PropTypes.func.isRequired,
// };

"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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

interface IItems {
  label: string;
  value: string;
}

export function SelectWithSearch({
  items = [],
  value: initValue,
  onValueChange,
}: {
  items: IItems[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {items?.find((item) => item.value === value)?.label ?? "Selecione..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[250px] p-0'>
        <Command>
          <CommandInput placeholder='Buscar...' />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
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
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
