"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import type { PropsWithChildren } from "react";

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemeProvider
      attribute="class"
      themes={["light", "dark", "dim"]}
      enableColorScheme={false}
      enableSystem={false}
      // dim only changes the bg color to a lighter black
      // the rest of the styles are applied by tailwind which only sees 'dark'
      // so here in the DOM its renamed
      value={{ light: "light", dim: "dark", dark: "dark" }}
    >
      {children}
    </NextThemeProvider>
  );
}
