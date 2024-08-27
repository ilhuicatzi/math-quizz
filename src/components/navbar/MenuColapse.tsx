import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import Link from "next/link";
function MenuColapse() {
  return (
    <Sheet >
    <SheetTrigger asChild >
      <Button variant="ghost" className="px-2">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-5">Menú</SheetTitle>
      </SheetHeader>
    <div className="flex flex-col items-start gap-4 w-full">
    <SheetClose asChild>
          <Link href="/pages/auth/register" className=" px-4 py-1 w-full hover:scale-105 hover:bg-zinc-200 hover:dark:bg-zinc-900 rounded-lg transition-all duration-500">Register</Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/pages/auth/login" className=" px-4 py-1 w-full hover:scale-105 hover:bg-zinc-200 hover:dark:bg-zinc-900 rounded-lg transition-all duration-500">Login</Link>
        </SheetClose>

        <SheetClose asChild>
          <Link href="/pages/about" className=" px-4 py-1 w-full hover:scale-105 hover:bg-zinc-200 hover:dark:bg-zinc-900 rounded-lg transition-all duration-500">About</Link>
        </SheetClose>
    </div>
    </SheetContent>
  </Sheet>
  )
}

export default MenuColapse