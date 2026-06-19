import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";

function RoleRoute({ roles, children }) {

  const { user, loading } = useContext(AuthContext);

  if (loading)
    return <h2>Loading...</h2>;

  if (!user)
    return <Navigate to={ROUTES.AUTH} replace />;

  if (!roles.includes(user.role))
    return <Navigate to={ROUTES.DASHBOARD} replace />;

  return children;

}

export default RoleRoute;