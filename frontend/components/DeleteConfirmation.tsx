import { useRef, useState } from "react";

import { toast } from "sonner";
import { Trash } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function DeleteConfirmation({ id, type }: { id: number; type: string }) {
  const [loading, setLoading] = useState(false);

  const dialogRef = useRef<HTMLButtonElement>(null);

  const handleDelete = async () => {
    setLoading(true);

    try {
      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} excluído com sucesso.`
      );
    } catch (error) {
      toast.error(`Erro ao excluir ${type}.`);
    } finally {
      setLoading(false);
      dialogRef.current?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' ref={dialogRef} title={`Excluir ${type}`}>
          <Trash className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Tem certeza que deseja excluir este {type}?</DialogTitle>
        <DialogFooter className='mt-5'>
          <DialogClose asChild>
            <Button disabled={loading} variant='outline'>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='submit'
            variant='destructive'
            disabled={loading}
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
