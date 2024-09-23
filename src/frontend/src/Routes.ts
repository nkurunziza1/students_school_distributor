import DahLayout from "./layouts/DahLayout";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import ProfileTemplate from "./pages/Profile";


const routes = [
  {
    path: "/",
    element: Layout,
    children: [
      { path: "", element: Home },
      { path: "profile", element: ProfileTemplate },
    ],
  },
  {
    path: "/dashboard",
    element: DahLayout,
    children: [
      // { path: ""},
    ],
  }
];

export default routes;
