import Layout from "../../components/Layout/Layout";
import Dashboard from "../../pages/Dashboard/Dashboard";
import GeneralSetting from "../../pages/GeneralSetting/GeneralSetting";
import Permissions from "../../pages/Permissions/Permissions";
import Profile from "../../pages/Profile/Profile";
import Roles from "../../pages/Roles/Roles";
import Users from "../../pages/Users/Users";
import PrivateGard from "./PrivateGard";

// Create Private Routes
const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/roles",
            element: <Roles />,
          },
          {
            path: "/permissions",
            element: <Permissions />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/settings",
            element: <GeneralSetting />,
          },
        ],
      },
    ],
  },
];

// Export
export default privateRoutes;
