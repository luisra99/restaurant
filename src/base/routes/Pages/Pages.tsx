import { Outlet, Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";
import DashboardLayout from "@/base/layouts/dashboard";
import { getPageHeight } from "./utils";
import routes from "..";

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          }
        >
          {Object.values(routes).map(
            ({ path, component: Component, subPath }) => {
              if (Component && path) {
                return <Route key={path} path={path} element={<Component />} />;
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
                          element={<ChildComponent />}
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
      </Routes>
    </Box>
  );
}

export default Pages;
