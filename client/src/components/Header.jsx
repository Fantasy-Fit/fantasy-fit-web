import "./Header.css";
import HeaderOption from "./HeaderOption";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/auth/userSlice";
import { useLogoutMutation } from "../store/auth/authApiSlice";
import { logOut } from "../store/auth/userSlice";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();
  const [, removeCookie] = useCookies(["token"]);
  const token = user.token;

  const handlePopup = () => {
    const popup = document.getElementById("profile-popup");
    popup.classList.toggle("show");
  };

  const handleLogout = async () => {
    try {
      await logout({ headers: { Authorization: `Bearer  ${token}` } });
      dispatch(logOut());
      removeCookie("token");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const profilePopup = (
    <div className="popup">
      <div id="profile-popup" className="popup__content">
        <h2>Hi, {user.username}! 👋</h2>
        {/* <button>
          <div>
            <EditIcon />Profile
          </div>
        </button> */}
        <button onClick={handleLogout}>
          <div>
            <LogoutIcon />
            Logout
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-1.png"
          alt=""
        />

        {/* <div className="header__search">
          <SearchIcon />
          <input type="text" />
        </div> */}
      </div>
      <div className="header__right">
        <Link to="profile">
          <HeaderOption Icon={HomeIcon} title="Home" />
        </Link>
        <Link to="friends">
          <HeaderOption Icon={GroupsIcon} title="Friends" />
        </Link>
        <Link to="chat">
          <HeaderOption Icon={ChatIcon} title="Chat" />
        </Link>
        <Link to="notifications">
          <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        </Link>
        <div onClick={handlePopup}>
          {(user.avatar && <img src={user.avatar} alt="avatar" />) || (
            <HeaderOption avatar="https://imageio.forbes.com/specials-images/imageserve/5ed00f17d4a99d0006d2e738/0x0.jpg?format=jpg&crop=4666,4663,x154,y651,safe&height=416&width=416&fit=bounds" />
          )}
        </div>
        {profilePopup}
      </div>
    </div>
  );
}

export default Header;
