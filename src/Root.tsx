import { ComponentType, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import ThemeProvider from "@/base/theme/Provider";
import { CssBaseline } from "@mui/material";
import SW from "./base/sections/SW";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <HelmetProvider>
          <ThemeProvider>
            <>
              <CssBaseline />
              <SW />
              <HelmetProvider>
                <BrowserRouter>
                  <Suspense>
                    <SnackbarProvider>
                      <App />
                    </SnackbarProvider>
                  </Suspense>
                </BrowserRouter>
              </HelmetProvider>
            </>
          </ThemeProvider>
        </HelmetProvider>
      </RecoilRoot>
    </StrictMode>
  );
}

export default render;
