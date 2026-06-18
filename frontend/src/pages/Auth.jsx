import { useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import { validateEmail,validatePassword,validateRequired,} from "../utils/validation";

function Auth() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const switchMode = (mode) => {
  if (loading) return;
  clearFields();
  setIsLogin(mode);
  // No navigation needed.
  //  Both forms are on the same page.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (isLogin) {
      if (!validateRequired(email, password)) {
        alert("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }
    } else {
      if (!validateRequired(name, email, password)) {
        alert("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }

      if (!validatePassword(password)) {
        alert("Password must be at least 6 characters.");
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post("/auth/login", {
          email,
          password,
        });

        login(res.data);

        showSuccess("Login Successful");

        navigate("/");
      } else {
        await axios.post("/auth/register", {
          name,
          email,
          password,
        });

        showSuccess("Registration Successful");
        clearFields();
        setIsLogin(true);
      }
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h1 style={{ textAlign: "center" }}>
        EventHub
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
  type="button"
  disabled={loading}
  onClick={() => switchMode(true)}
  style={{
    background: isLogin ? "#1565c0" : "#6c757d",
  }}
>
  Login
</button>

        <button
  type="button"
  disabled={loading}
  onClick={() => switchMode(false)}
  style={{
    background: !isLogin ? "#1565c0" : "#6c757d",
  }}
>
  Register
</button>

        
      </div>

      <form onSubmit={handleSubmit}>

        {!isLogin && (
          <input
            placeholder="Name"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>
          {loading
            ? isLogin
              ? "Logging in..."
              : "Registering..."
            : isLogin
            ? "Login"
            : "Register"}
        </button>

      </form>

    </div>
  );
}

export default Auth;