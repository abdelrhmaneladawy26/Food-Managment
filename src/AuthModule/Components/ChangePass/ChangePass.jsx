import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePass({ handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .put("https://upskilling-egypt.com/api/v1/Users/ChangePassword", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        handleClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      {" "}
      <form className=" w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <h2>Change Your Password</h2>
        <p>Enter your details below</p>

        <div className="form-group my-3">
          <input
            className="form-control"
            type="password"
            placeHolder="Old Password"
            {...register("oldPassword", {
              required: true,
            })}
          />
          {errors.oldPassword && errors.oldPassword.type === "required" && (
            <span className="text-danger"> Old Password is Required</span>
          )}
        </div>

        <div className="form-group my-3">
          <input
            className="form-control"
            type="password"
            placeHolder="New Password"
            {...register("newPassword", {
              required: true,
            })}
          />
          {errors.newPassword && errors.newPassword.type === "required" && (
            <span className="text-danger"> New Password is Required</span>
          )}
        </div>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="password"
            placeHolder="Confirm New Password"
            {...register("confirmNewPassword", {
              required: true,
            })}
          />
          {errors.confirmNewPassword &&
            errors.confirmNewPassword.type === "required" && (
              <span className="text-danger">
                {" "}
                Confirm New Password is Required
              </span>
            )}
        </div>

        <div className="form-group my-3">
          <button className="btn btn-success w-100">Change Password</button>
        </div>
      </form>{" "}
      <ToastContainer />
    </div>
  );
}
