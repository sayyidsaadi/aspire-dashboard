import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../fetures/auth/authApi";
import { getAuth, setMessageEmpty } from "../../fetures/auth/authSlice";
import { useEffect } from "react";
import { createToast } from "../../helper/toastAlert";
const Login = () => {
  const { error, message, user } = useSelector(getAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { input, handleChangeInput, resetForm } = useForm({
    email: "",
    password: "",
  });

  // Handle Submit Login Form
  const handleSubmitLoginForm = (e) => {
    e.preventDefault();
    dispatch(userLogin(input));
    resetForm();
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
    if (error) {
      createToast(error, "warning");
      dispatch(setMessageEmpty());
    }
  }, [error, dispatch, user, navigate, message]);
  return (
    <>
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Link to="/" className="">
                  <h3 className="text-primary">
                    <i className="fa fa-user-edit me-2"></i>Aspire
                  </h3>
                </Link>
                <h3>Sign In</h3>
              </div>
              <form onSubmit={handleSubmitLoginForm}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    value={input.email}
                    onChange={handleChangeInput}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={input.password}
                    onChange={handleChangeInput}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <a href="">Forgot Password</a>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary py-3 w-100 mb-4"
                >
                  Sign In
                </button>
              </form>
              <p className="text-center mb-0">
                Dont have an Account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
