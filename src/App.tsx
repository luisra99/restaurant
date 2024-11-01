import "./global.css";

import { withErrorHandler } from "@/base/components/error-handling";
import AppErrorBoundaryFallback from "@/base/components/error-handling/fallbacks/App";
import Pages from "@/base/routes/Pages";
import { ConfirmProvider } from "material-ui-confirm";
function App() {
  return (
    <ConfirmProvider>
      <Pages />
    </ConfirmProvider>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
