import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import Home from "./HomeModule/Components/Home/Home";
import UsersList from "./UsersModule/Components/UsersList/UsersList";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import CategoriesList from "./CategoriesModule/Components/CategoriesList/CategoriesList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import Login from "./AuthModule/Components/Login/Login";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./SharedModule/Components/ProtectedRoute/ProtectedRoute";
import ResetPassRequest from "./AuthModule/Components/ResetPassRequest/ResetPassRequest";
import ResetPass from "./AuthModule/Components/ResetPass/ResetPass";
import { ToastContainer } from "react-toastify";
import ChangePass from "./AuthModule/Components/ForgetPass/ChangePass";

function App() {
  const [adminData, setAdminData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);
  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    setAdminData(decodedToken);
  };
  const router = createBrowserRouter([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <UsersList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoriesList /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "ChangePass", element: <ChangePass /> },
        { path: "reset-pass-request", element: <ResetPassRequest /> },
        { path: "reset-pass", element: <ResetPass /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
