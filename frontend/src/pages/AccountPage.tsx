import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(false);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const { user, ready, setUser } = useContext<UserContextType | undefined>(
    UserContext
  ) as UserContextType;
  if (!ready) return "Loading...";

  if (ready && !user && !redirect) return <Navigate to="/login" />;

  function linkClasses(type: string | null = null) {
    let classes = "py-2 px-4";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  async function logOut() {
    const response = await axios.post(
      "http://localhost:8000/api/logout",
      {},
      { withCredentials: true }
    );
    if (response.data) {
      setUser(null);
      setRedirect(true);
    }
  }
  if (redirect) return <Navigate to={"/"} />;
  return (
    <div>
      <nav className="w-full flex gap-4 justify-center mt-8 mb-10">
        <Link className={linkClasses("profile")} to="/account">
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to="/account/bookings">
          My bookings
        </Link>
        <Link className={linkClasses("places")} to="/account/places">
          My accommodations
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center max-w-xl mx-auto">
          <p>
            Logged in as <span className=" capitalize">{user?.name}</span>
          </p>
          <button onClick={logOut} className="primary max-w-max">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
