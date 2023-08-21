import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import PopupModal from "../../components/PopupModal/PopupModal";
import { getAllUserData, setMessageEmpty } from "../../fetures/user/userSlice";
import { timeAgo } from "../../helper/timeAgo";
import useForm from "../../hooks/useForm";
import {
  createNewPermission,
  deletePermission,
  updatePermissionStatus,
} from "../../fetures/user/userApi";
import swal from "sweetalert";
import { useEffect } from "react";
import { createToast } from "../../helper/toastAlert";

const Permissions = () => {
  const { permissions, error, message } = useSelector(getAllUserData);
  const dispatch = useDispatch();
  const { input, handleChangeInput, resetForm } = useForm({
    name: "",
  });
  // const [editPermissionInput, setEditPermissionInput] = useState({
  //   name: "",
  // });

  // Handle Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(createNewPermission(input));
    resetForm();
  };

  // Handle Delete Permission
  const handleDeletePermission = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePermission(id));
      } else {
        swal("Your Data is safe!");
      }
    });
  };

  // Handle Update Permission Status
  const handleUpdatePermissionStatus = (id, status) => {
    dispatch(updatePermissionStatus({ id, status }));
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
  }, [message, error, dispatch]);
  return (
    <>
      <div className="content">
        <Header />
        <PageHeader title="Permissions" />
        <PopupModal title="Add New Permission" targetId="addNewPermission">
          <form onSubmit={handleSubmitForm}>
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

            <button type="submit" className="btn btn-primary w-100 ">
              Create New Permission
            </button>
          </form>
        </PopupModal>

        <PopupModal title="Edit Permission" targetId="editPermission">
          <form onSubmit={handleSubmitForm}>
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

            <button type="submit" className="btn btn-primary w-100 ">
              Create New Permission
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
                  data-bs-target="#addNewPermission"
                >
                  Add New Permission
                </button>
              </div>
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Permissions Table</h6>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions ? (
                        [...permissions]?.reverse().map((data, index) => {
                          return (
                            <tr className="text-center" key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{data.name}</td>
                              <td>{data.slug}</td>
                              <td>{timeAgo(data.createdAt)}</td>
                              <td>
                                <div className="form-check form-switch d-flex justify-content-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitch1"
                                    checked={data.status ? true : false}
                                    onClick={() =>
                                      handleUpdatePermissionStatus(
                                        data._id,
                                        data.status
                                      )
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customSwitch1"
                                  ></label>
                                </div>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-warning me-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editPermission"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    handleDeletePermission(data._id)
                                  }
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="text-center">
                          <td colSpan={6}>
                            <p>
                              No Data Found <i className="fas fa-search"></i>
                            </p>
                          </td>
                        </tr>
                      )}
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

export default Permissions;
