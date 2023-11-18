import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/menu-logo.png";
export default function SideBar() {
  let navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
  return (
    <div>
      <div className="menu">
        <ul>
          <div className="logo-box">
            <img src={logo} alt="logo" />
          </div>
          <li>
            <a>
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </a>
          </li>
          <li>
            <a>
              <i className="fas fa-user-group"></i>
              <p>Users</p>
            </a>
          </li>
          <li>
            <a>
              <i className="fa-solid fa-table-list"></i>
              <p>Recipes</p>
            </a>
          </li>
          <li>
            <a>
              <i className="fa-regular fa-calendar-days"></i>
              <p>Categories</p>
            </a>
          </li>
          <li>
            <button className="btn bg-danger text-white" onClick={logOut}>
              LogOut
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
