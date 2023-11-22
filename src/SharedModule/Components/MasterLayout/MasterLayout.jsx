import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import NavBar from "../Navbar/NavBar";

export default function MasterLayout({ adminData }) {
  return (
    <>
      <div className="">
        <div className="d-flex  gap-4">
          <div>
            <div>
              <SideBar />
            </div>
          </div>
          <div className="w-100">
            <NavBar adminData={adminData} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
