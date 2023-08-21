import { Link, useLocation } from "react-router-dom";
import userAvatar from "../../assets/images/users/sadi-avatr.jpg";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-secondary navbar-dark">
          <Link to="/" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">
              <i className="fa fa-user-edit me-2"></i>DarkPan
            </h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              {user?.photo ? (
                <img
                  className="rounded-circle"
                  src={`http://localhost:5050/images/user/${user?.photo}`}
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              ) : (
                <img
                  className="rounded-circle"
                  src={userAvatar}
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              )}

              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">{user?.name}</h6>
              <span>{user?.role?.name}</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            {user?.role?.permissions?.includes("Dashboard") && (
              <Link
                to="/"
                className={`nav-item nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </Link>
            )}
            {user?.role?.permissions?.includes("Products") && (
              <Link
                to="/products"
                className={`nav-item nav-link ${
                  location.pathname === "/products" ? "active" : ""
                }`}
              >
                <i className="fab fa-product-hunt me-2"></i>Products
              </Link>
            )}
            {user?.role?.permissions?.includes("Tages") && (
              <Link
                to="/tages"
                className={`nav-item nav-link ${
                  location.pathname === "/tages" ? "active" : ""
                }`}
              >
                <i className="fas fa-tag me-2"></i>Tages
              </Link>
            )}
            {user?.role?.permissions?.includes("Brands") && (
              <Link
                to="/brands"
                className={`nav-item nav-link ${
                  location.pathname === "/brands" ? "active" : ""
                }`}
              >
                <i className="fab fa-bandcamp me-2"></i>Brands
              </Link>
            )}
            {user?.role?.permissions?.includes("Orders") && (
              <Link
                to="/orders"
                className={`nav-item nav-link ${
                  location.pathname === "/orders" ? "active" : ""
                }`}
              >
                <i className="fas fa-shopping-bag me-2"></i>Orders
              </Link>
            )}

            {user?.role?.permissions?.includes("Users") && (
              <Link
                to="/users"
                className={`nav-item nav-link ${
                  location.pathname === "/users" ? "active" : ""
                }`}
              >
                <i className="fa fa-users me-2"></i>Users
              </Link>
            )}
            {user?.role?.permissions?.includes("Roles") && (
              <Link
                to="/roles"
                className={`nav-item nav-link ${
                  location.pathname === "/roles" ? "active" : ""
                }`}
              >
                <i className="fas fa-user-lock me-2"></i>Roles
              </Link>
            )}
            {user?.role?.permissions?.includes("Permissions") && (
              <Link
                to="/permissions"
                className={`nav-item nav-link ${
                  location.pathname === "/permissions" ? "active" : ""
                }`}
              >
                <i className="fa fa-key me-2"></i>Permissions
              </Link>
            )}

            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-laptop me-2"></i>Elements
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="button.html" className="dropdown-item">
                  Buttons
                </a>
                <a href="typography.html" className="dropdown-item">
                  Typography
                </a>
                <a href="element.html" className="dropdown-item">
                  Other Elements
                </a>
              </div>
            </div>
            <a href="widget.html" className="nav-item nav-link">
              <i className="fa fa-th me-2"></i>Widgets
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
