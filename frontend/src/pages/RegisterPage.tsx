import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiServer } from "../config/config";
import { enqueueSnackbar } from "notistack";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "")
      return enqueueSnackbar({
        message: "Check your credentials",
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
        autoHideDuration: 2000,
      });
    try {
      const response = await axios.post(`${apiServer}register`, {
        email,
        password,
        name,
      });
      if (response.status === 201) {
        enqueueSnackbar({
          message: "Registered Successfully",
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          autoHideDuration: 2000,
        });
        setName("");
        setEmail("");
        setPassword("");
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
  return (
    <div className="mt-5">
      <h1 className="text-3xl text-center mb-4">Register</h1>
      <form onSubmit={onSubmit} className="max-w-xl mx-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John doe"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="***********"
        />
        <button type="submit" className="primary">
          Register
        </button>
        <div className="text-center py-2 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-black underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
