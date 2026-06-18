import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  return token
    ? children
    : <Navigate to={ROUTES.AUTH} replace />;

}

export default ProtectedRoute;