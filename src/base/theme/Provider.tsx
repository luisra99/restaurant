import { ThemeProvider, createTheme } from "@mui/material/styles";

import useTheme from "@/base/store/theme";
import { shadows } from "@/base/theme/shadows";
import { overrides } from "@/base/theme/overrides";
import { customShadows } from "@/base/theme/custom-shadows";
import themes from "./themes";
import type { CustomThemeProviderProps } from "./types";
import { ThemeOptions } from "@mui/material";
import { useMemo } from "react";
import { typography } from "./typography";

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [theme] = useTheme();
  const memoizedValue = useMemo<ThemeOptions>(
    () => ({
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );
  const baseTheme = createTheme({
    ...memoizedValue,
    palette: themes[theme].palette,
  });
  baseTheme.components = overrides(baseTheme);
  return <ThemeProvider theme={baseTheme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
