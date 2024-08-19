"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import Link from "next/link"; 

function LoginComponent() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar Sesión </CardTitle>
        <CardDescription>
          Inicia sesión con tu correo y contraseña
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="/pages/auth/register" className="text-primary font-semibold">
            Regístrate
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginComponent;
