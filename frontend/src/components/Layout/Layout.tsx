import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { SnackbarProvider } from "notistack";
const Layout = () => {
  return (
    <div className="p-4">
      <SnackbarProvider />
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
