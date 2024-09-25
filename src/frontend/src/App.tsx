import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Routes";
import ScrollToTop from "./components/ui/ScrollToTop";

import React from "react";
import ProtectedRoute from "./guard/protecteRoutes";

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                // route.protected ? (
                //   <ProtectedRoute>
                //     <route.element />
                //   </ProtectedRoute>
                // ) : (
                  <route.element />
                // )
              }
            >
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={
                      // childRoute.protected ? (
                      //   <ProtectedRoute>
                      //     <childRoute.element />
                      //   </ProtectedRoute>
                      // ) : (
                        <childRoute.element />
                      // )
                    }
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </Router>
      <ScrollToTop />
    </main>
  );
};

export default App;
