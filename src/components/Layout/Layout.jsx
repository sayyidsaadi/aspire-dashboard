import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
