import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

export default function MasterLayout() {
  return (
    <>
      <div className="">
        <div className="row w-100">
          <div className="col-md-2 ">
            <div>
              <SideBar />
            </div>
          </div>
          <div className="col-md-10">
            <Navbar />
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
