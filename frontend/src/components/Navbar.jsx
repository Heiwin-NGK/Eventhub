import {
  Link
} from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <Link to="/">
        Dashboard
      </Link>

      {" | "}

      <Link to="/events">
        Events
      </Link>

      {" | "}

      <Link to="/tickets">
        Tickets
      </Link>

      {" | "}

      <Link to="/notifications">
        Notifications
      </Link>

      {" | "}

      <Link to="/analytics">
        Analytics
      </Link>

    </nav>
  );
}

export default Navbar;