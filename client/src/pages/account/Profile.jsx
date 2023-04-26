import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserCompetitions,
} from "../../store/auth/userSlice";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLogoutMutation } from "../../store/auth/authApiSlice";
import { logOut } from "../../store/auth/userSlice";
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
      dispatch(logOut());
      removeCookie("token");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  }

  const content =
    <div className="profile__main">
      {/* <Header /> */}
      <div className="profile__body"></div>
      <section className="">
        <section className="profile">

          <div className="new-competition-container">
            <div className="new-competition">
              <Link to="/new-competition">
                <img src="https://cdn-icons-png.flaticon.com/512/4959/4959925.png" />
              </Link>
              <button>
                <Link to="/new-competition">New Competition</Link>
              </button>
            </div>
            <div className="new-competition">
              <img src="https://cdn-icons-png.flaticon.com/512/6679/6679633.png" />
              <button>
                <Link to="/join">Join</Link>
              </button>
            </div>
          </div>
        </section>
      </section>

      <div className="profile__main">
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
      </div>;
    </div>
  return content;
}

export default Profile;
