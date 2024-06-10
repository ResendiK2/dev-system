"use client";

import { IMeta } from "@/utils/types";
import { Button } from "../components/ui/button";

export function Pagination({
  isLoading = false,
  paginationData,
  setPage,
}: {
  isLoading: boolean;
  paginationData?: IMeta;
  setPage: (page: number) => void;
}) {
  const { current_page = 1, last_page = 1 } = paginationData || {};

  return (
    <div
      data-testid='pagination'
      className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-center sm:justify-between items-center py-4'
    >
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
