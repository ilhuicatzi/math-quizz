import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type User = {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  escuela: string;
  grado: string;
  grupo: string;
  createdAt: Date;
};

function DatosGeneralesUser({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos Generales</CardTitle>
        <CardDescription>
          Información general acerca de tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="grid gap-y-2">
          <Label>Nombre:</Label>
          <Input
            type="text"
            value={`${user.nombre} ${user.apellido}` || ''}
            disabled
          />
        </div>
        <div className="grid gap-y-2">
          <Label>Email:</Label>
          <Input type="email" value={user.email || ''} disabled />
        </div>
        <div className="grid gap-y-2">
          <Label>Escuela:</Label>
          <Input type="text" value={user.escuela || ''} disabled />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-y-2">
            <Label>Grado:</Label>
            <Input type="text" value={user.grado || ''} disabled />
          </div>
          <div className="grid gap-y-2">
            <Label>Grupo:</Label>
            <Input type="text" value={user.grupo || ''} disabled />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DatosGeneralesUser;
