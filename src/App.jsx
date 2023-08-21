import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import route from "./routes/routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logedInUser } from "./fetures/auth/authApi";
import {
  getAllRoles,
  getAllUser,
  getAllUserPermission,
} from "./fetures/user/userApi";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(logedInUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUserPermission());
    dispatch(getAllRoles());
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={route} />
    </>
  );
}

export default App;
