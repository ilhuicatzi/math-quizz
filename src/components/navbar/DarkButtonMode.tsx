"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

function DarkButtonMode() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50 flex justify-center items-center">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <IoMoonOutline className="w-5 h-5" /> : <IoSunnyOutline className="w-5 h-5" />}
      </button>
    </div>
  )
}

export default DarkButtonMode