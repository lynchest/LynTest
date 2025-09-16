"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

const THEMES = ["light", "dark", "forest", "rose", "sunrise", "matrix", "pastel-spring", "deep-ocean", "retro-80s", "coffee-break", "space-exploration", "minimal-white"];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props} themes={THEMES}>{children}</NextThemesProvider>
}
