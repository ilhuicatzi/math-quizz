"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ButtonResultReditc() {
  const router = useRouter();
  return <Button onClick={() => router.push("/pages/user")}>Continuar</Button>;
}

export default ButtonResultReditc;
