import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import SinglePlace from "./pages/SinglePlace";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="account/:subpage?" element={<AccountPage />} />
          <Route path="account/:subpage/:action" element={<AccountPage />} />
          <Route path="/account/places/list/:id" element={<SinglePlace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
