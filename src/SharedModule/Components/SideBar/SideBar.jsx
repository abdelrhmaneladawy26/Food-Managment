import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/menu-logo.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChangePass from "../../../AuthModule/Components/ChangePass/ChangePass";

export default function SideBar() {
  let [isCollapsed, setIsCollapsed] = useState(true);
  let navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  // Modal handler
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePass handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <div className="sidebar-container">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <li className="" onClick={handleToggle}>
              <img className="w-100 my-4" src={logo} alt="logo" />
            </li>
            <MenuItem
              icon={<i className="fa fa-home"></i>}
              component={<Link to="/dashboard" />}
            >
              {" "}
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-users"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-table-list"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              {" "}
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-table-list"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              {" "}
              Categories
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-unlock"></i>}
              title="Change Password"
              onClick={handleShow}
            >
              {" "}
              Change Password
            </MenuItem>
            <MenuItem
              icon={
                <i className="fa-solid fa-arrow-right-from-bracket text-danger"></i>
              }
              onClick={logOut}
            >
              {" "}
              LogOut
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
}
