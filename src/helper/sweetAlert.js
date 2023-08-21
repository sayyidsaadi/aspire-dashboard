import swal from "sweetalert";
// Create Sweet Alert

export const createSweetAlert = (title, msg, type = "success") => {
  swal(title, msg, type);
};

export const confirmationAlert = () => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
};
