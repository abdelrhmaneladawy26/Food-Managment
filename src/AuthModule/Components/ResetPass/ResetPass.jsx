import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Reset", data)
      .then((response) => {
        navigate("/login");
        setTimeout(() => {
          toast.success(" Reset Password success");
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <form className=" w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <h2> Reset Password</h2>
        <p>Please Enter Your Otp or Check Your Inbox</p>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <span className="text-danger"> Email is Required</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span className="text-danger"> invalid Email</span>
          )}
        </div>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="text"
            placeholder="OTP"
            {...register("seed", {
              required: true,
            })}
          />
          {errors.seed && errors.seed.type === "required" && (
            <span className="text-danger"> OTP is Required</span>
          )}
        </div>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="password"
            placeholder="New Password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <span className="text-danger"> Old Password is Required</span>
          )}
        </div>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm New Password"
            {...register("confirmPassword", {
              required: true,
            })}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <span className="text-danger"> Confirm New Password</span>
            )}
        </div>
        <button className="btn my-4 btn-success w-100">Reset Password</button>
      </form>
    </div>
  );
}
