import {
  useState,
  useContext,
} from "react";

import axios from "../api/axios";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  useNavigate,
} from "react-router-dom";

function Login() {

  const [email, setEmail] =
    useState("");

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

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        login(
          res.data
        );

        navigate("/");

      } catch (error) {
        alert(
          error.response.data
            .message
        );
      }
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
    >
      <h1>Login</h1>

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

      <button>
        Login
      </button>
    </form>
  );
}

export default Login;