import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { createToast } from "../../helper/toastAlert";
import { useDispatch } from "react-redux";
import { updateUser } from "../../fetures/auth/authApi";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const GeneralSetting = () => {
  const [passwordSection, setPasswordSection] = useState(true);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [updatePersonalInfoSection, setUpdatePersonalInfoSection] =
    useState(false);
  const { input, handleChangeInput } = useForm({
    currentpassword: "",
    password: "",
    cpassword: "",
  });
  const [editPersonalInfo, setEditPersonalInfo] = useState({
    name: user.name ? user.name : "",
    email: user.email ? user.email : "",
    mobile: user.mobile ? user.mobile : "",
  });

  // Handle Password Section
  const handlePasswordSection = () => {
    setPasswordSection(true);
    setUpdatePersonalInfoSection(false);
  };

  // Handle Update Personal Info Sec
  const handleUpdatePersonalInfoSec = () => {
    setUpdatePersonalInfoSection(true);
    setPasswordSection(false);
  };

  // Handle Submit Update Password
  const handleSubmitUpdatePassword = (e) => {
    e.preventDefault();

    // Validation
    if (!input.currentpassword || !input.password) {
      return createToast("All Fileds Are Required", "error");
    }

    // Check Confirm Password
    if (input.cpassword !== input.password) {
      return createToast("Confirm Password Dosen't Match", "error");
    }

    // Send Data
    dispatch(updateUser({ id: user._id, data: input }));
  };

  // Handle Change Personal Info
  const handleChangePersonalInfo = (e) => {
    setEditPersonalInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Submit Edit Personal Info
  const handleSubmitEditPersonalInfo = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user._id, data: editPersonalInfo }));
  };

  // useEffect(() => {
  //   if (message) {
  //     createToast(message, "success");
  //     dispatch(setMessageEmpty());
  //   }
  //   if (error) {
  //     createToast(error, "error");
  //     dispatch(setMessageEmpty());
  //   }
  // }, [message, error, dispatch]);
  return (
    <>
      <div className="content">
        <Header />

        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <div className="row">
                  <div className="col-12 mx-auto">
                    <div className="top-breadcrumb">
                      <h4 className="my-4">General Settings</h4>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">Setting</li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            <Link to="/settings">General Settings</Link>
                          </li>
                        </ol>
                      </nav>
                    </div>
                    <div className="bottom-breadcrumb-menu d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-outline-primary"
                        onClick={handlePasswordSection}
                      >
                        Password
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleUpdatePersonalInfoSec}
                      >
                        Personal Info
                      </button>
                    </div>
                    <div className="bottom-breadcrumb">
                      <div className="col-5 mx-auto">
                        {passwordSection && (
                          <div className="password-info mt-4">
                            <form onSubmit={handleSubmitUpdatePassword}>
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="floatingText"
                                  placeholder="jhondoe"
                                  name="currentpassword"
                                  value={input.currentpassword}
                                  onChange={handleChangeInput}
                                />
                                <label htmlFor="floatingText">
                                  Current Password
                                </label>
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
                                <label htmlFor="floatingPassword">
                                  New Password
                                </label>
                              </div>
                              <div className="form-floating mb-4">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="floatingPassword"
                                  placeholder="Confirm Password"
                                  name="cpassword"
                                  value={input.cpassword}
                                  onChange={handleChangeInput}
                                />
                                <label htmlFor="floatingPassword">
                                  Confirm Password
                                </label>
                              </div>

                              <button
                                type="submit"
                                className="btn btn-primary  w-100 "
                              >
                                Update Password
                              </button>
                            </form>
                          </div>
                        )}
                        {updatePersonalInfoSection && (
                          <div className="personal-info mt-4">
                            <form onSubmit={handleSubmitEditPersonalInfo}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="floatingText"
                                  placeholder="jhondoe"
                                  name="name"
                                  value={editPersonalInfo.name}
                                  onChange={handleChangePersonalInfo}
                                />
                                <label htmlFor="floatingText">Name</label>
                              </div>
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="name@example.com"
                                  name="email"
                                  value={editPersonalInfo.email}
                                  onChange={handleChangePersonalInfo}
                                />
                                <label htmlFor="floatingInput">
                                  Email address
                                </label>
                              </div>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="name@example.com"
                                  name="mobile"
                                  value={editPersonalInfo.mobile}
                                  onChange={handleChangePersonalInfo}
                                />
                                <label htmlFor="floatingInput">Number</label>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary w-100 "
                              >
                                Update Personal Info
                              </button>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default GeneralSetting;
