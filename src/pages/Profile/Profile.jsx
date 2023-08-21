import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import profileAvatar from "../../assets/images/users/sadi-avatr.jpg";
import PopupModal from "../../components/PopupModal/PopupModal";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../fetures/auth/authApi";

const Profile = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();

  // Handle Profile Photo
  const handleProfilePhoto = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Handle Submit Photo
  const handleSubmitPhoto = () => {
    const dataForm = new FormData();
    dataForm.append("user-photo", profileImage);
    dispatch(updateUser({ id: user._id, data: dataForm }));
  };
  return (
    <>
      <div className="content">
        <Header />

        <PopupModal title="Edit Profile Photo" targetId="editProfileInfo">
          <div className="mb-3 text-center">
            <label htmlFor="profilePhoto">
              {/* {profileImage ? (
                <img
                  className="img-fluid rounded-circle"
                  src={URL.createObjectURL(profileImage)}
                  style={{ width: "150px", height: "150px", cursor: "pointer" }}
                  alt=""
                />
              ) : (
                user.photo && (
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={`http://localhost:5050/images/user/${user.photo}`}
                    alt=""
                  />
                )
              )} */}
              {profileImage ? (
                <img
                  className="img-fluid rounded-circle"
                  src={URL.createObjectURL(profileImage)}
                  style={{ width: "150px", height: "150px", cursor: "pointer" }}
                  alt=""
                />
              ) : user.photo ? (
                <img
                  className="img-fluid rounded-circle"
                  src={`http://localhost:5050/images/user/${user.photo}`}
                  style={{ width: "150px", height: "150px", cursor: "pointer" }}
                  alt=""
                />
              ) : (
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={profileAvatar}
                  alt=""
                />
              )}
            </label>
            <input
              type="file"
              id="profilePhoto"
              onChange={handleProfilePhoto}
              className="d-none"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 "
            onClick={handleSubmitPhoto}
          >
            Update Photo
          </button>
        </PopupModal>
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <div className="row">
                  <div className="col-6 mx-auto text-center">
                    <div className="user-profile">
                      <div className="profile-header">
                        {user.photo ? (
                          <img
                            src={`http://localhost:5050/images/user/${user.photo}`}
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                            }}
                            alt={user?.name}
                            className="img-fluid"
                          />
                        ) : (
                          <img
                            src={profileAvatar}
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                            }}
                            alt={user?.name}
                            className="img-fluid"
                          />
                        )}

                        <div className=" position-relative">
                          <h5 className="my-2">Hammad Sadi</h5>
                          <i
                            className="fa fa-edit text-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#editProfileInfo"
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "50px",
                              cursor: "pointer",
                              fontSize: "20px",
                            }}
                          ></i>
                        </div>
                        <div className="d-flex gap-1 justify-content-center align-items-center">
                          <i className="fas fa-envelope"></i>
                          <p className="m-0">hammadsadi@gmail.com</p>
                        </div>
                        <div className="d-flex gap-1 justify-content-center align-items-center">
                          <i className="fas fa-map-marker-alt"></i>
                          <p className="m-0">Sunamganj</p>
                        </div>
                      </div>
                      <div className="profile-body">
                        <hr />
                        <div className="profile-body-info d-flex align-items-center justify-content-center">
                          <table className="text-center">
                            <tbody>
                              <tr className="d-flex gap-5 my-2">
                                <td>Name :</td>
                                <td>Hammad Sadi</td>
                              </tr>
                              <tr className="d-flex gap-5 my-2">
                                <td>Email :</td>
                                <td>Sadi</td>
                              </tr>
                              <tr className="d-flex gap-5 my-2">
                                <td>Mobile :</td>
                                <td>434563466</td>
                              </tr>
                              <tr className="d-flex gap-5 my-2">
                                <td>Role :</td>
                                <td> Sadi</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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

export default Profile;
