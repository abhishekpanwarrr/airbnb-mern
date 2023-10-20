import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="mt-5">
      <h1 className="text-3xl text-center mb-4">Register</h1>
      <form className="max-w-xl mx-auto">
        <input type="text" placeholder="John doe" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="***********" />
        <button type="submit" className="primary">
          Login
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
