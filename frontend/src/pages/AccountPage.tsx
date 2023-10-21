import { useContext } from "react";
import { UserContext, UserContextType } from "../context/userContext";
import { Link, Navigate, useParams } from "react-router-dom";

const AccountPage = () => {
  const { subpage } = useParams();
  console.log("subpage", subpage);

  const { user, ready } = useContext<UserContextType | undefined>(
    UserContext
  ) as UserContextType;
  if (!ready) return "Loading...";

  if (ready && !user) return <Navigate to="/login" />;

  function linkClasses(type: string | null = null) {
    let classes = "py-2 px-4";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  return (
    <div>
      <nav className="w-full flex gap-4 justify-center mt-8">
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
    </div>
  );
};

export default AccountPage;
