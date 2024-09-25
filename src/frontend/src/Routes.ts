import DahLayout from "./layouts/DahLayout";
import Layout from "./layouts/Layout";
import AddSchoolPage from "./pages/Dashboard/AddSchoolPage";
import AddStudentPage from "./pages/Dashboard/AddStudent";
import AddStudent from "./pages/Dashboard/AddStudent";
import DistributionPage from "./pages/Dashboard/DistributionsPage";
import HomePage from "./pages/Dashboard/HomePage";
import SchoolsPage from "./pages/Dashboard/SchoolsPage";
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
      { 
        path: "schools",
        element:SchoolsPage
      },
      { 
        path: "distributions",
        element:DistributionPage
      },
      { 
        path: "schools/add-school",
        element:AddSchoolPage
      },
      { 
        path: "schools/add-student",
        element:AddStudentPage
      },
    ],
    // protected: true,
  },
];

export default routes;
