import { useContext } from "react";

import Navbar from "../components/Navbar";

import { AuthContext }
from "../context/AuthContext";

function Profile() {

  const { user } =
    useContext(AuthContext);

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="card">

          <h1>User Profile</h1>

          <p>

            <strong>Name:</strong>

            {user?.name}

          </p>

          <p>

            <strong>Email:</strong>

            {user?.email}

          </p>

          <p>

            <strong>Role:</strong>

            {user?.role}

          </p>

        </div>

      </div>

    </>
  );

}

export default Profile;