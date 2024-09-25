import DahLayout from "./layouts/DahLayout";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import ProfileTemplate from "./pages/Profile";

const routes = [
  {
    path: "/",
    element: Layout,
    children: [
      { path: "", element: Home, protected: false },
      { path: "profile", element: ProfileTemplate, protected: true },
    ],
    protected: true,
  },
  {
    path: "/dashboard",
    element: DahLayout,
    children: [
      // { path: ""},
    ],
    protected: true,
  },
];

export default routes;
