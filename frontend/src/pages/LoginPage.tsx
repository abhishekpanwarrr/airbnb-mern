import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="mt-5">
      <h1 className="text-3xl text-center mb-4">Login</h1>
      <form className="max-w-xl mx-auto">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="*******" />
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
