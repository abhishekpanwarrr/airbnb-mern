import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiServer } from "../config/config";
import { enqueueSnackbar } from "notistack";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiServer}login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        enqueueSnackbar({
          message: "Login Successful",
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 2000,
        });
        setRedirect(true);
      }
    } catch (error) {
      return enqueueSnackbar({
        message: "Something went wrong please check your details",
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
        autoHideDuration: 4000,
      });
    }
  };

  if (redirect) return <Navigate to="/" />;
  return (
    <div className="mt-5">
      <h1 className="text-3xl text-center mb-4">Login</h1>
      <form className="max-w-xl mx-auto" onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="primary">
          Login
        </button>
        <div className="text-center py-2 text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-black underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
