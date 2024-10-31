import "../../components/backdrop/backdrop.css";

import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import AuthGuard from "../auth-guard";
import Box from "@mui/material/Box";
import CallBackUrlController from "../callback-url-controller";
import DashboardLayout from "@/base/layouts/dashboard";
import NotFoundView from "@/base/layouts/error";
import { getPageHeight } from "./utils";
import routes from "..";

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </AuthGuard>
          }
        >
          {Object.values(routes).map(
            ({ path, component: Component, subPath }) => {
              if (Component && path) {
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      // <AuthGuard>
                      <Component />
                      // </AuthGuard>
                    }
                  />
                );
              }

              return (
                subPath &&
                Object.values(subPath).map(
                  ({ path: childPath, component: ChildComponent }) => {
                    if (ChildComponent && path && childPath) {
                      const completePath = `${path}${childPath}`;
                      return (
                        <Route
                          key={completePath}
                          path={completePath}
                          element={
                            <AuthGuard>
                              <ChildComponent />
                            </AuthGuard>
                          }
                        />
                      );
                    }
                    return null;
                  }
                )
              );
            }
          )}
        </Route>

        <Route path="/create-session" element={<CallBackUrlController />} />
        <Route path="404" element={<NotFoundView />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Box>
  );
}

export default Pages;
