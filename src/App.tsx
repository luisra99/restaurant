import "./global.css";

import { withErrorHandler } from "@/base/components/error-handling";
import AppErrorBoundaryFallback from "@/base/components/error-handling/fallbacks/App";
import Pages from "@/base/routes/Pages";
import { LanguageProvider } from "./base/components/contexts/i18context";
import { ConfirmProvider } from "material-ui-confirm";
function App() {
  return (
    <LanguageProvider>
      <ConfirmProvider>
        <Pages />
      </ConfirmProvider>
    </LanguageProvider>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
