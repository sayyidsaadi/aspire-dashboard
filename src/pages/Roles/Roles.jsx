import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import PopupModal from "../../components/PopupModal/PopupModal";
import { getAllUserData, setMessageEmpty } from "../../fetures/user/userSlice";
import useForm from "../../hooks/useForm";
import { useState } from "react";
import {
  createNewRole,
  deleteRoles,
  updateRolesStatus,
  updateRolesUpdate,
} from "../../fetures/user/userApi";
import { timeAgo } from "../../helper/timeAgo";
import { useEffect } from "react";
import { createToast } from "../../helper/toastAlert";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { convertToLowerCase } from "../../helper/loweCase";

const Roles = () => {
  const { permissions, roles, error, message } = useSelector(getAllUserData);
  const dispatch = useDispatch();
  const [permissionCheckBox, setPermissionCheckBox] = useState([]);
  const [roleEdit, setRoleEdit] = useState({});
  const { input, handleChangeInput, resetForm } = useForm({
    name: "",
  });

  // Handle Change Checkbox
  const handleChangeCheckbox = (e) => {
    const val = e.target.value;
    const updateSelect = [...permissionCheckBox];
    if (permissionCheckBox.includes(val)) {
      updateSelect.splice(permissionCheckBox.indexOf(val), 1);
    } else {
      updateSelect.push(val);
    }
    setPermissionCheckBox(updateSelect);
  };

  // Handle Submit Role
  const handleSubmitRole = (e) => {
    e.preventDefault();
    dispatch(
      createNewRole({
        name: input.name,
        permissions: [...permissionCheckBox],
      })
    );
    resetForm();
    setPermissionCheckBox([]);
  };

  // Handle Delete Roles
  const handleDeleteRoles = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Role!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRoles(id));
      } else {
        swal("Your Data is safe!");
      }
    });
  };

  // Handle Role Status Update
  const handleRoleStatus = (id, status) => {
    dispatch(updateRolesStatus({ id, status }));
  };

  // Handle Edit Role
  const handleEditRole = (id) => {
    const editData = roles.find((data) => data._id === id);
    setRoleEdit(editData);
    setPermissionCheckBox(editData.permissions);
  };

  // Handle Change Role Edit Input
  const handleChangeRoleEditInput = (e) => {
    setRoleEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Submit Role Edit
  const handleSubmitRoleEdit = (e) => {
    e.preventDefault();
    dispatch(
      updateRolesUpdate({
        name: roleEdit.name,
        permissions: permissionCheckBox,
        id: roleEdit._id,
      })
    );
  };

  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
  });

  return (
    <>
      <div className="content">
        <Header />
        <PopupModal title="Add New Role" targetId="addNewRoles">
          <form onSubmit={handleSubmitRole}>
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
            <div className="mb-3">
              <label htmlFor="" className="d-block">
                Permissions
              </label>
              {permissions?.map((data, index) => {
                return (
                  <>
                    {data.status && (
                      <label key={index} className="d-flex gap-1">
                        <input
                          type="checkbox"
                          value={data.name}
                          onChange={handleChangeCheckbox}
                          checked={permissionCheckBox.includes(data.name)}
                        />
                        {data.name}
                      </label>
                    )}
                  </>
                );
              })}
            </div>

            <button type="submit" className="btn btn-primary w-100 ">
              Create New Role
            </button>
          </form>
        </PopupModal>
        <PopupModal title="Edit Role" targetId="editRoles">
          <form onSubmit={handleSubmitRoleEdit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingText"
                placeholder="jhondoe"
                name="name"
                value={roleEdit.name}
                onChange={handleChangeRoleEditInput}
              />
              <label htmlFor="floatingText">Name</label>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block">
                Permissions
              </label>
              {permissions?.map((data, index) => {
                return (
                  <>
                    {data.status && (
                      <label key={index} className="d-flex gap-1">
                        <input
                          type="checkbox"
                          value={data.name}
                          onChange={handleChangeCheckbox}
                          checked={permissionCheckBox.includes(data.name)}
                        />
                        {data.name}
                      </label>
                    )}
                  </>
                );
              })}
            </div>

            <button type="submit" className="btn btn-primary w-100 ">
              Update Role
            </button>
          </form>
        </PopupModal>
        <PageHeader title="Roles" />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="add-btn d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#addNewRoles"
                >
                  Add New Role
                </button>
              </div>
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Roles Table</h6>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Permissions</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles &&
                        [...roles].reverse().map((data, index) => {
                          return (
                            <tr
                              className="text-center align-middle"
                              key={index}
                            >
                              <th scope="row">{index + 1}</th>
                              <td>{data.name}</td>
                              <td>{data.slug}</td>
                              <td>
                                <ul>
                                  {data.permissions.map((item, index) => {
                                    return (
                                      <li
                                        key={index}
                                        style={{ listStyleType: "none" }}
                                      >
                                        <Link
                                          to={`/${convertToLowerCase(item)}`}
                                        >
                                          {item}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </td>
                              <td>{timeAgo(data.createdAt)}</td>
                              <td>
                                <div className="form-check form-switch d-flex justify-content-center">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                    checked={data.status ? true : false}
                                    onClick={() =>
                                      handleRoleStatus(data._id, data.status)
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-warning me-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editRoles"
                                  onClick={() => handleEditRole(data._id)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDeleteRoles(data._id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
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

export default Roles;
