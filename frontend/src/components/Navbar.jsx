import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLES } from "../constants/roles";
import { useNavigate } from "react-router-dom";

function Navbar() {
const { user,logout,} = useContext(AuthContext);
const navigate =  useNavigate();
const handleLogout = () => {
  logout();
  navigate(ROUTES.AUTH);
};
  return (
    <nav>

      <Link to={ROUTES.DASHBOARD}>Dashboard</Link>

<Link to={ROUTES.EVENTS}>Events</Link>

{user?.role !== ROLES.ATTENDEE && (
  <Link to={ROUTES.CREATE_EVENT}>Create Event</Link>
)}

{user?.role === ROLES.ATTENDEE && (
  <Link to={ROUTES.TICKETS}>Tickets</Link>
)}

{user?.role === ROLES.ATTENDEE && (
  <Link to={ROUTES.NOTIFICATIONS}>Notifications</Link>
)}

{(user?.role === ROLES.ADMIN ||
  user?.role === ROLES.ORGANIZER) && (
  <Link to={ROUTES.SCAN_TICKET}>
    Scan Tickets
  </Link>
)}

{(user?.role === ROLES.ADMIN ||
  user?.role === ROLES.ORGANIZER) && (
  <>
    <Link to={ROUTES.ANALYTICS}>Analytics</Link>

    <Link to={ROUTES.REPORTS}>Reports</Link>
  </>
)}

<Link to={ROUTES.PROFILE}>Profile</Link>
<button onClick={handleLogout}>
  Logout
</button>
    </nav>
  );
}

export default Navbar;