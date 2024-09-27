import DahLayout from "./layouts/DahLayout";
import Layout from "./layouts/Layout";
import AddSchoolPage from "./pages/Dashboard/AddSchoolPage";
import AddStudentPage from "./pages/Dashboard/AddStudent";
import AddStudent from "./pages/Dashboard/AddStudent";
import DistributionPage from "./pages/Dashboard/DistributionsPage";
import HomePage from "./pages/Dashboard/HomePage";
import SchoolsPage from "./pages/Dashboard/SchoolsPage";
import Home from "./pages/Home";
import ResultsPage from "./pages/ResultsPage";

const routes = [
  {
    path: "/",
    element: Layout,
    children: [
      {
        path: "",
        element: Home,
         protected: false
      },
      {
        path: "results",
        element: ResultsPage,
         protected: true
      },
    ],
    protected: true,
  },
  {
    path: "/dashboard",
    protected: true,
    element: DahLayout,
    children: [
      { 
        path: "",
        element:HomePage,
        protected: true,
      },
      { 
        path: "schools",
        element:SchoolsPage,
        protected: true,
      },
      { 
        path: "distributions",
        element:DistributionPage,
        protected: true,
      },
      { 
        path: "schools/add-school",
        element:AddSchoolPage,
        protected: true,
      },
      { 
        path: "schools/add-student",
        element:AddStudentPage,
        protected: true,
      },
    ],
    
  },
];

export default routes;
