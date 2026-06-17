import { useState } from "react";
import axios from "../api/axios";

function Register() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

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

        alert(
          res.data.message
        );

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

      <button>
        Register
      </button>
    </form>
  );
}

export default Register;