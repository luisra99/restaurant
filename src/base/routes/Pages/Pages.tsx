import { Outlet, Route, Routes } from "react-router-dom";

import DashboardLayout from "@/base/layouts/dashboard";
import routes from "..";

function Pages() {
  return (
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
  );
}

export default Pages;
