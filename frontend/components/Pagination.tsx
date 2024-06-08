"use client";

import { IMeta } from "@/utils/types";
import { Button } from "../components/ui/button";

export function Pagination({
  isLoading,
  paginationData,
  setPage,
}: {
  isLoading: boolean;
  paginationData?: IMeta;
  setPage: (page: number) => void;
}) {
  const { current_page, last_page } = paginationData || {};

  if (!current_page || !last_page) return null;

  return (
    <div className='flex justify-between items-center space-x-2 py-4'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => setPage(current_page - 1)}
        disabled={isLoading || current_page === 1}
      >
        Pagina anterior ({current_page ? current_page - 1 : 1})
      </Button>

      <span>
        Página {current_page} de {last_page}
      </span>

      <Button
        variant='outline'
        size='sm'
        onClick={() => setPage(current_page + 1)}
        disabled={isLoading || last_page === current_page}
      >
        Proxima pagina ({current_page ? current_page + 1 : 1})
      </Button>
    </div>
  );
}
