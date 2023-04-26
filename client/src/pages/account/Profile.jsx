import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserCompetitions,
} from "../../store/auth/userSlice";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLogoutMutation } from "../../store/auth/authApiSlice";
import RecentWorkouts from "./RecentWorkouts";
import EditProfileModal from "./EditProfileModal";
import { useGetCompetitionsQuery } from "../../store/game/competitionApiSlice";
import { setUserInfo } from "../../store/auth/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "./Sidebar";
import MainFeed from "./MainFeed";

function Profile() {
  const user = useSelector(selectCurrentUser);
  // const competitions = useSelector(selectUserCompetitions);
  const token = user.token;
  const [, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const { data: competitions, isLoading } = useGetCompetitionsQuery(user.id);
  console.log(competitions);

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      dispatch(setUserInfo([...competitions]));
    }
  }, [competitions]);

  const mapComps = competitions?.map((comp) => {
    return (




      <div className="competition-card" key={comp.identifier}>
        <Link to={`/tournament/${comp.id}`} state={comp}>
          <img src={comp.icon} />
          {comp.name}
        </Link>
      </div>
    );
  });

  async function handleLogout() {
    try {
      await logout({ headers: { Authorization: `Bearer  ${token}` } });
      removeCookie("token");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  }

  const openEditProfileModal = () => {
    const modal = document.getElementById("edit-profile-modal");
    modal.style.display = "block";
  };

  const content = (
    <div className="profile__main"> 
      <Header />
      <div className="profile__body">
        <Sidebar 
        image={user.avatar}
        username={user.username}
        email={user.email}
        gender={user.gender}
        location={user.location}
        handleLogout={handleLogout}
        />
        <MainFeed 
        current_competitions={mapComps}
        />
    </div>
    <div className="profile">
      <EditProfileModal />
    </div>
    </div>
    
  );
  return content;
}

export default Profile;
