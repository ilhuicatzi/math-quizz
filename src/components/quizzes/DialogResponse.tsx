import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Latex from "react-latex-next";

interface DialogResponseProps {
  options: {
    id: string;
    value: string;
    item: string;
    color: string;
  };
  idQuestion: number;
  handleResponse: (idQuestion: number, idOption: string) => void;
}

function DialogResponse({
  options,
  idQuestion,
  handleResponse,
}: DialogResponseProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className={`px-12 py-5 text-white ${options.color}`}
        >
          <Latex>{`$ ${options.value} $`}</Latex>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tu respuesta es la opción: {options.item}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Si deseas cambiar tu respuesta, selecciona otra opción, de lo
            contrario, presiona continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleResponse(idQuestion, options.id);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DialogResponse;
