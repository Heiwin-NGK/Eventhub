import Navbar
from "../components/Navbar";

function Profile() {

  const token =
    localStorage.getItem(
      "token"
    );

  return (
    <>
      <Navbar />

      <h1>
        User Profile
      </h1>

      <p>
        Logged In
      </p>

      <p>
        Token:
      </p>

      <textarea
        rows="6"
        cols="60"
        readOnly
        value={token}
      />

    </>
  );
}

export default Profile;