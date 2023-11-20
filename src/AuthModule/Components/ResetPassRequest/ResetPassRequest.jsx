import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassRequest() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Reset/Request", data)
      .then((response) => {
        toast.success("Mail sent  successfully");
        navigate("/reset-pass");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error sending OTP");
      });
  };
  return (
    <div>
      <form className=" w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <h2>Request Reset Password</h2>
        <p>Please Enter Your Email And Check Your Inbox</p>
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
        <button className="btn my-4 btn-success w-100">Send</button>
      </form>
    </div>
  );
}
