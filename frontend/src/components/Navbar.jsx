import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/auth";
  };

  return (
    <nav>

      <Link to="/">
        Dashboard
      </Link>
      <Link to="/events">
        Events
      </Link>
      <Link to="/create-event">
        Create Event
      </Link>
      <Link to="/tickets">
        Tickets
      </Link>
      <Link to="/notifications">
        Notifications
      </Link>
      <Link to="/analytics">
        Analytics
      </Link>
      <Link to="/reports">
        Reports
      </Link>
      <Link to="/profile">
        Profile
      </Link>
      <button onClick={logout}>  Logout </button>

    </nav>
  );
}

export default Navbar;