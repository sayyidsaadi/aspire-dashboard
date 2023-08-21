import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import PopupModal from "../../components/PopupModal/PopupModal";
import useForm from "../../hooks/useForm";
import { getAllUserData, setMessageEmpty } from "../../fetures/user/userSlice";
import { generatePassword } from "../../helper/helper";
import {
  createUser,
  updateUserStatus,
  userDelete,
  userUpdate,
} from "../../fetures/user/userApi";
import { useEffect, useState } from "react";
import { createToast } from "../../helper/toastAlert";
import { timeAgo } from "../../helper/timeAgo";
import swal from "sweetalert";

const Users = () => {
  const dispatch = useDispatch();
  const { roles, users, error, message } = useSelector(getAllUserData);
  const [editUser, setEditUser] = useState({});
  const { input, setInput, handleChangeInput, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Handle Generate Pass
  const handleGeneratePass = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      password: generatePassword(),
    }));
  };

  // Handle Submit User Form
  const handleSubmitUserForm = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
    resetForm();
  };

  // Handle Edit User
  const handleEditUser = (id) => {
    let editedUser = users.find((data) => data._id === id);
    setEditUser(editedUser);
  };

  // Handle Edit User Change Input
  const handleEditUserChangeInput = (e) => {
    setEditUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Submit User Edit Form
  const handleSubmitUserEditForm = (e) => {
    e.preventDefault();
    dispatch(userUpdate(editUser));
  };

  // Handle Delete User
  const handleDeleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(userDelete(id));
      } else {
        swal("Your imaginary User is safe!");
      }
    });
  };

  // Handle User Status
  const handleUserStatus = (id, status) => {
    dispatch(updateUserStatus({ id, status }));
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  return (
    <>
      <div className="content">
        <Header />
        <PageHeader title="Users" />
        <PopupModal title="Add New User" targetId="addNewUser">
          <form onSubmit={handleSubmitUserForm}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingText"
                placeholder="jhondoe"
                name="name"
                value={input.name}
                onChange={handleChangeInput}
              />
              <label htmlFor="floatingText">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingText"
                placeholder="jhondoe"
                name="email"
                value={input.email}
                onChange={handleChangeInput}
              />
              <label htmlFor="floatingText">Email</label>
            </div>
            <div className="mb-3">
              <select
                name="role"
                value={input.role}
                onChange={handleChangeInput}
                className="form-select"
                id=""
              >
                <option value="">--Select Role--</option>
                {roles?.map((data, index) => {
                  return (
                    <option value={data._id} key={index}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingText"
                placeholder="jhondoe"
                name="password"
                value={input.password}
                onChange={handleChangeInput}
              />
              <label htmlFor="floatingText">Password</label>
              <a
                href=""
                className="btn btn-outline-primary mt-1"
                onClick={handleGeneratePass}
              >
                <i className="fas fa-sync-alt me-1"></i>Generate Password
              </a>
            </div>

            <button type="submit" className="btn btn-primary w-100 ">
              Create User
            </button>
          </form>
        </PopupModal>
        <PopupModal title="Edit User" targetId="editUser">
          <form onSubmit={handleSubmitUserEditForm}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingText"
                placeholder="jhondoe"
                name="name"
                value={editUser.name}
                onChange={handleEditUserChangeInput}
              />
              <label htmlFor="floatingText">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingText"
                placeholder="jhondoe"
                name="email"
                value={editUser.email}
                onChange={handleEditUserChangeInput}
              />
              <label htmlFor="floatingText">Email</label>
            </div>
            <div className="mb-3">
              <select
                name="role"
                value={editUser.role}
                onChange={handleEditUserChangeInput}
                className="form-select"
                id=""
              >
                <option value="">--Select Role--</option>
                {roles?.map((data, index) => {
                  return (
                    <option value={data._id} key={index}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100 ">
              Update User
            </button>
          </form>
        </PopupModal>
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="add-btn d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#addNewUser"
                >
                  Add New User
                </button>
              </div>
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Users Table</h6>
                <div className="table-responsive">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        ? [...users]?.reverse().map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item?.role?.name}</td>
                                <td>
                                  <div className="form-check form-switch d-flex justify-content-center">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexSwitchCheckChecked"
                                      checked={item.status ? true : false}
                                      onClick={() =>
                                        handleUserStatus(item._id, item.status)
                                      }
                                    />
                                  </div>
                                </td>
                                <td>{timeAgo(item.createdAt)}</td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-warning me-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editUser"
                                    onClick={() => handleEditUser(item._id)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteUser(item._id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        : "No User Found"}
                    </tbody>
                  </table>
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

export default Users;
