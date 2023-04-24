import { Outlet } from "react-router-dom";
import Header from "./Header";
import { selectCurrentUser } from "../store/auth/userSlice";
import { useSelector } from "react-redux";

const Layout = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div>
      {user && <Header />}
      <Outlet />;
    </div>
  );
};

export default Layout;
