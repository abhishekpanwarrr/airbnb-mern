import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiServer } from "../config/config";
import { enqueueSnackbar } from "notistack";
import { UserContext, UserContextType } from "../context/userContext";

export interface Response {
  status: number;
  data: {
    email: string;
    name: string;
    __v: number;
    _id: string;
  };
}
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext<UserContextType | undefined>(
    UserContext
  ) as UserContextType;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "")
      return enqueueSnackbar({
        message: "Check your email and password",
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
        autoHideDuration: 2000,
      });
    try {
      const response: Response = await axios.post(
        `${apiServer}login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("response.data", response);

      if (response.status === 200) {
        setUser(response?.data);
        enqueueSnackbar({
          message: "Login Successful",
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          autoHideDuration: 2000,
        });
        setRedirect(true);
      }
    } catch (error) {
      return enqueueSnackbar({
        message: "Something went wrong please check your details",
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
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
