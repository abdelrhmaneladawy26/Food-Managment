import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post("https://upskilling-egypt.com/api/v1/Users/Login", data)
      .then((response) => {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/dashboard");
        saveAdminData();
        toast.success("Login success");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div>
      <form className=" w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
        <p>Welcome Back! Please enter your details</p>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="email"
            placeholder="Enter your E-mail"
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
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <span className="text-danger"> Password is Required</span>
          )}
        </div>
        <div className="form-group my-3">
          <div className=" d-flex my-3 justify-content-between align-content-center">
            <Link to="/reset-pass-request" className="text-black">
              Register Now ?
            </Link>
            <Link to="/reset-pass-request" className="text-success">
              Forgot Password ?
            </Link>
          </div>
          <button className="btn btn-success w-100">Login</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
