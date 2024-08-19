"use client";
import { SessionProvider } from "next-auth/react";

interface SeccionProviderProps{
  children: React.ReactNode;
}

function SessionProviderContex({ children }: SeccionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SessionProviderContex;