"use client"

import * as React from "react"
import { MoonIcon, SunDim } from "lucide-react"
import { useTheme } from "next-themes"



export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <div 
      className="flex items-center justify-center p-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-50"
      onClick={() => {theme !== "light" ? setTheme("light") : setTheme("dark"), console.log(theme)}}
    >
        <div className="flex items-center justify-center w-6 ">
          {theme === "light" ? <SunDim/> : <MoonIcon className="w-4"/>}
        </div>
    </div>
  )
}

