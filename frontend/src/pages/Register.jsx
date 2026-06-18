import { useState } from "react";
import axios from "../api/axios";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import { validateEmail,validatePassword,validateRequired,} from "../utils/validation";
function Register() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
  
    const [loading, setLoading] = useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();
      if (
  !validateRequired(
    name,
    email,
    password
  )
) {
  alert("All fields are required.");
  return;
}

if (!validateEmail(email)) {
  alert("Invalid email address.");
  return;
}

if (!validatePassword(password)) {
  alert(
    "Password must be at least 6 characters."
  );
  return;
}

      try {

  const res =
    await axios.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

showSuccess("Registration Successful");

} catch (error) {
  alert(getErrorMessage(error));
} finally {

  setLoading(false);

};
    }

  return (
    <div className="container">
    <form
      onSubmit={
        handleSubmit
      }
    >
      <div className="card">
      <h1>Register</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button disabled={loading}>
  {loading ? "Registering..." : "Register"}
</button> </div>
    </form> </div>
  );
}

export default Register;