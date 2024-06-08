import { useEffect } from "react";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import { getLevels } from "@/api/niveis";

import { ICustomError, IGetNiveis } from "@/utils/types";

interface UseLevelsResult {
  data: IGetNiveis | undefined;
  error: ICustomError | null;
  isLoading: boolean;
}

export function useLevels({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}): UseLevelsResult {
  const { data, error, isLoading } = useQuery({
    queryKey: ["niveis", page, query],
    queryFn: () => getLevels({ page, query }),
    staleTime: 300000,
  });

  useEffect(() => {
    if (error) {
      const customError = error as ICustomError;
      toast.error(
        customError?.response?.data?.error ||
          customError?.message ||
          "Erro ao buscar niveis"
      );
    }
  }, [error]);

  return { data, error: error as ICustomError, isLoading };
}
