import { useState,useContext,} from "react";
import axios from "../api/axios";
import { AuthContext,} from "../context/AuthContext";
import { useNavigate,} from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import { validateEmail,validateRequired,} from "../utils/validation";

function Login() {
  const [email, setEmail] =
    useState("");
  const [loading, setLoading] =
  useState(false);

  const [
    password,
    setPassword,
  ] = useState("");

  const { login } =
    useContext(
      AuthContext
    );

  const navigate =
    useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);
  if (!validateRequired(email, password)) {
  alert("Please fill in all fields.");
  return;
}

if (!validateEmail(email)) {
  alert("Please enter a valid email.");
  return;
}

  try {
    const res = await axios.post("/auth/login", {
      email,
      password,
    });

login(res.data);

showSuccess("Login Successful");

navigate("/");
  } catch (error) {
    alert(getErrorMessage(error));
    } finally {
    setLoading(false);
  }
};
  return (
<div className="container">
    <form
      onSubmit={
        handleSubmit
      }
    >
      <div className="card">
      <h1>Login</h1>

      <input
  disabled={loading}
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
  disabled={loading}
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
  {loading ? "Logging in..." : "Login"}
</button></div>
    </form> </div>
  );
}

export default Login;