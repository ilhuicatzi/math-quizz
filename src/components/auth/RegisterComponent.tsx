"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

function RegisterComponent() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Crea tu cuenta</CardTitle>
        <CardDescription>Regístrate para comenzar a aprender</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/pages/auth/login" className="text-primary font-semibold">
            Inicia sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default RegisterComponent;
