import Navbar from "../components/Navbar";

function Profile() {

  const token =
    localStorage.getItem(
      "token"
    );

  return (
    <>
  <Navbar />

  <div className="container">

    <div className="card">
      <h1>User Profile</h1>
    </div>

    <div className="card">
      <p>Logged In</p>

      <p>Token:</p>

      <textarea
        rows="6"
        cols="60"
        readOnly
        value={token}
      />
    </div>

  </div>
</>
  );
}

export default Profile;