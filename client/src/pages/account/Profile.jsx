import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useLogoutMutation } from "../../store/auth/authApiSlice";
import { logOut } from "../../store/auth/userSlice";
import { useGetCompetitionsQuery } from "../../store/game/competitionApiSlice";
import { setCompetitions } from "../../store/game/competitionSlice";
import Sidebar from "./Sidebar";
import MainFeed from "./MainFeed";
import EditProfileModal from "./EditProfileModal";
import "./Profile.css";

function Profile() {
  const user = useSelector(selectCurrentUser);
  const token = user.token;

  const [, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const { data: competitions, isLoading: isCompsLoading, refetch: refetchComps } = useGetCompetitionsQuery(user.id);

  useEffect(() => {
    refetchComps();
  }, []);

  useEffect(() => {
    if (isCompsLoading) {
      return;
    } else {
      console.log()
      dispatch(setCompetitions([...competitions]));
    }
  }, [competitions])


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
