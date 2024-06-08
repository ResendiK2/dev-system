"use client";

import React, { useState, useEffect, useCallback } from "react";

import { debounce } from "lodash";
import { OptionsOrGroups, GroupBase } from "react-select";
import AsyncSelect from "react-select/async";

import { useLevels } from "@/hooks/useLevels";

import { INivel } from "@/utils/types";

interface IItems {
  label: string;
  value: string;
}

export function SelectWithSearch({
  value,
  onValueChange,
  disabled,
}: {
  value: string | null;
  onValueChange: (value: string | null) => void;
  disabled?: boolean;
}) {
  const [query, setQuery] = useState<string>("");
  const [defaultOptions, setDefaultOptions] = useState<
    OptionsOrGroups<IItems, GroupBase<IItems>>
  >([]);
  const [selectedOption, setSelectedOption] = useState<IItems | null>(null);

  const { data, isLoading } = useLevels({ query });

  const debouncedSetQuery = useCallback(
    debounce((inputValue: string) => {
      // If the input value is empty, set a default query to fetch initial data
      if (inputValue === "") {
        setQuery("initial-query"); // replace 'initial-query' with your desired default query
      } else {
        setQuery(inputValue);
      }
    }, 300),
    []
  );

  const loadOptions = (
    inputValue: string,
    callback: (options: OptionsOrGroups<IItems, GroupBase<IItems>>) => void
  ) => {
    debouncedSetQuery(inputValue);

    if (!data?.data) {
      callback([]);
      return;
    }

    const options = data.data.map((nivel: INivel) => ({
      label: nivel.nivel,
      value: String(nivel.id),
    }));
    callback(options as OptionsOrGroups<IItems, GroupBase<IItems>>);
  };

  useEffect(() => {
    if (data?.data) {
      const options = data.data.map((nivel: INivel) => ({
        label: nivel.nivel,
        value: String(nivel.id),
      }));
      setDefaultOptions(options as OptionsOrGroups<IItems, GroupBase<IItems>>);

      if (value) {
        const selected =
          options.find((option) => option.value === value) || null;
        setSelectedOption(selected);
      }
    }
  }, [data, value]);

  useEffect(() => {
    setQuery("");
  }, [value]);

  return (
    <AsyncSelect
      isClearable
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      isDisabled={disabled}
      value={selectedOption}
      onChange={(option) => onValueChange(option?.value || null)}
      isLoading={isLoading}
      placeholder='Selecione um nível'
      noOptionsMessage={() => "Nenhum resultado encontrado"}
    />
  );
}
