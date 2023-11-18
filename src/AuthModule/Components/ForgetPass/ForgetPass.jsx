import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .put(
        "http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/login");
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
            placeholder="Old Password"
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
            placeholder="New Password"
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
            placeholder="Confirm New Password"
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
