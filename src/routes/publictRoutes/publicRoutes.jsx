import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import PublicGard from "./PublicGard";

// Create Public Routes
const publicRoutes = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

// Export
export default publicRoutes;
