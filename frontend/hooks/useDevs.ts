import { useEffect } from "react";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import { getDevs } from "@/api/desenvolvedores";

import { ICustomError, IGetDesenvolvedores } from "@/utils/types";

interface UseDevsResult {
  data: IGetDesenvolvedores | undefined;
  error: ICustomError | null;
  isLoading: boolean;
}

export function useDevs({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}): UseDevsResult {
  const { data, error, isLoading } = useQuery({
    queryKey: ["devs", page, query],
    queryFn: () => getDevs({ page, query }),
    staleTime: 300000,
  });

  useEffect(() => {
    if (error) {
      const customError = error as ICustomError;
      toast.error(
        customError?.response?.data?.error ||
          customError?.message ||
          "Erro ao buscar desenvolvedores"
      );
    }
  }, [error]);

  return { data, error: error as ICustomError, isLoading };
}
