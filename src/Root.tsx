import { ComponentType, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import SessionBackDrop from "./base/components/backdrop/backdrop";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import "./global.css";
import ThemeProvider from "@/base/theme/Provider";
import { CssBaseline } from "@mui/material";
import HotKeys from "./base/sections/HotKeys";
import SW from "./base/sections/SW";
import Notifications from "./base/sections/Notifications";

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
              <Notifications />
              <HotKeys />
              <SW />
              <SessionBackDrop />
              <HelmetProvider>
                <BrowserRouter>
                  <Suspense>
                    <App />
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
