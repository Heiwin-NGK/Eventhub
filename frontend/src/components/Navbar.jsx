import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = ROUTES.AUTH;
  };

  return (
    <nav>

      <Link to={ROUTES.DASHBOARD}>
        Dashboard
      </Link>

      <Link to={ROUTES.EVENTS}>
        Events
      </Link>

      <Link to={ROUTES.CREATE_EVENT}>
        Create Event
      </Link>

      <Link to={ROUTES.TICKETS}>
        Tickets
      </Link>

      <Link to={ROUTES.NOTIFICATIONS}>
        Notifications
      </Link>

      <Link to={ROUTES.ANALYTICS}>
        Analytics
      </Link>

      <Link to={ROUTES.REPORTS}>
        Reports
      </Link>

      <Link to={ROUTES.PROFILE}>
        Profile
      </Link>

      <button onClick={logout}>
        Logout
      </button>

    </nav>
  );
}

export default Navbar;