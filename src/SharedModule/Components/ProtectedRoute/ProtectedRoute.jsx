import { Navigate } from "react-router-dom";

function ProtectedRoute({ adminData, children }) {
  if (adminData == null && localStorage.getItem("adminToken") == null) {
    return <Navigate to="/login/" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
