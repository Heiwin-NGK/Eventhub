import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";

import Loader from "../components/Loader";

function ProtectedRoute({ children }) {

  const {
    user,
    loading,
  } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <Navigate
        to={ROUTES.AUTH}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;