import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PageHeader = ({ title }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-12">
            {location.pathname === "/" ? (
              <h3>Welcome {user.name}</h3>
            ) : (
              <h3>{title}</h3>
            )}

            <nav aria-label="breadcrumb m-0">
              <ol className="breadcrumb m-0">
                {location.pathname === "/" ? (
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to="/" className="active">
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li className="breadcrumb-item active" aria-current="page">
                    Dashboard
                    <Link to="" className="active">
                      {location.pathname}
                    </Link>
                  </li>
                )}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
