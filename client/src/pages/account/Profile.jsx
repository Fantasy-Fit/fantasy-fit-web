import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, selectUserCompetitions } from "../../store/auth/userSlice";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLogoutMutation } from "../../store/auth/authApiSlice";
import { logOut } from "../../store/auth/userSlice";
import { useGetCompetitionsQuery } from "../../store/game/competitionApiSlice";
import { setUserInfo } from "../../store/auth/userSlice";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import MainFeed from "./MainFeed";
import EditProfileModal from "./EditProfileModal";

function Profile() {
  const user = useSelector(selectCurrentUser);
  const token = user.token;
  const userCompetitions = useSelector(selectUserCompetitions);
  const [, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const { data: competitions, isLoading, refetch } = useGetCompetitionsQuery(user.id);

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      dispatch(setUserInfo({ competitions: userCompetitions || competitions }));
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
      dispatch(logOut());
      removeCookie("token");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  }

  const content =
    (<div className="profile__main">
      {/* <Header /> */}
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
    </div>)
  return content;
}

export default Profile;
