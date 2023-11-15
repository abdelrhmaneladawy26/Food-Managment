export default function Login() {
  return (
    <div>
      <form className=" w-75 m-auto">
        <h2>Log In</h2>
        <p>Welcome Back! Please enter your details</p>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="email"
            placeholder="Enter your E-mail"
          />
        </div>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group my-3">
          <button className="btn btn-success w-100">Login</button>
        </div>
      </form>
    </div>
  );
}
