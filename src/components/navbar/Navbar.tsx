"use client";
import DarkButtonMode from "./DarkButtonMode";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import DropdownProfile from "./DropdownProfile";

function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <nav className={`${pathname==='/'? "bg-[url('/img/portada.jpg')]" : "bg-background"}`}>
      <div className={`${pathname==='/' ? "dark:bg-black dark:opacity-60 absolute inset-0 " : " "}`}></div>
      <div className="flex justify-between items-center px-6 py-2 w-full z-10 text-sm backdrop-blur-lg">
      <Link href="/" className="text-2xl font-bold">
          Math
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {session ? (
              <>
                <DropdownProfile />
              </>
            ) : (
              <>
                <Link href="/pages/about" className={`border-b-2 border-transparent hover:border-primary hover:border-b-2 ${pathname==="/pages/about" ? "text-primary" : " "}`}>About</Link>
                <Link href="/pages/auth/register" className={` border-b-2 border-transparent hover:border-primary hover:border-b-2 ${pathname==="/pages/auth/register" ? "text-primary" : " "}`}>Register</Link>
                <Link href="/pages/auth/login" className={` border-b-2 border-transparent hover:border-primary hover:border-b-2 ${pathname==="/pages/auth/login" ? "text-primary" : " "}`}>Login</Link>
              </>
            )}
          </ul>
          <DarkButtonMode />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;