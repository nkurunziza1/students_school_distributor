import DahLayout from "./layouts/DahLayout";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Dashboard/HomePage";
import Home from "./pages/Home";
import ProfileTemplate from "./pages/Profile";
import ResultsPage from "./pages/ResultsPage";

const routes = [
  {
    path: "/",
    element: Layout,
    children: [
      {
        path: "",
        element: Home,
        //  protected: false
      },
      {
        path: "profile",
        element: ProfileTemplate,
        //  protected: true
      },
      {
        path: "results",
        element: ResultsPage,
        //  protected: true
      },
    ],
    // protected: true,
  },
  {
    path: "/dashboard",
    element: DahLayout,
    children: [
      { 
        path: "",
        element:HomePage
      },
    ],
    // protected: true,
  },
];

export default routes;
