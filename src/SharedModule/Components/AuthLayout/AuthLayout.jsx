import { Outlet } from "react-router-dom";
import logo from "../../../assets/images/Logo-login.png";
export default function AuthLayout() {
  return (
    <div className="Auth-container  container-fluid">
      <div className="row bg-overlay vh-100 justify-content-center align-items-center ">
        <div className=" bg-white col-md-6 p-2 rounded-5">
          <div className="logo-container text-center">
            <img src={logo} className="w-25" alt="logo" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
