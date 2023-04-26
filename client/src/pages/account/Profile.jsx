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
import Header from "../../components/Header";
import RecentWorkouts from "./RecentWorkouts";
import EditProfileModal from "./EditProfileModal";
import JoinCompetitionModal from "../newcompetition/JoinCompetitionModal";
// import Sidebar from "./Sidebar";
import { useGetCompetitionsQuery } from "../../store/game/competitionApiSlice";
import { setUserInfo } from "../../store/auth/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

  const openEditProfileModal = () => {
    const modal = document.getElementById("edit-profile-modal");
    modal.style.display = "block";
  };

  const openJoinCompModal = () => {
    const modal = document.getElementById("join-comp-modal");
    modal.style.display = "block";
  };

  const content = (
    <div className="profile__main">
      {/* <Header /> */}
      <div className="profile__body"></div>
      <section className="">
        <section className="profile">
          <div className="profile-top">
            <div className="profile-img-container">
              <img src={user.avatar} alt={user.username} />
            </div>
            <div className="my-profile">
              <h1>My Profile</h1>
              <div className="profile-row">
                <div className="profile-label">
                  <h4>Username:</h4>
                </div>
                <div>
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-label">
                  <h4>Email:</h4>
                </div>
                <div>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-label">
                  <h4>Gender:</h4>
                </div>
                <div>
                  <p>{user.gender}</p>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-label">
                  <h4>Location:</h4>
                </div>
                <div>
                  <p>{user.location}</p>
                </div>
              </div>
              <button onClick={openEditProfileModal}>Edit Profile</button>
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>
          <div className="new-competition-container">
            {/* <p>Notification/Profile Settings</p> */}
            {/* <p>Badges / Achievements</p> */}
            <div className="new-competition">
              <Link to="/new-competition">
                <img src="https://cdn-icons-png.flaticon.com/512/4959/4959925.png" />
                <button>New Competition</button>
              </Link>
            </div>
            <div className="new-competition" onClick={openJoinCompModal}>
              <img src="https://cdn-icons-png.flaticon.com/512/6679/6679633.png" />
              <button>Join</button>
            </div>
            <JoinCompetitionModal />
          </div>

          <div className="current-competition-container">
            <div className="current-competition-container-inner">
              <h2>Current Competitions</h2>
              <div>{mapComps}</div>
              {/* <h3>Past Competitions</h3> */}
              <h3>Recent Workouts</h3>
              <RecentWorkouts />
              {/* <p>Friends & Followers [To be Built]</p> */}
            </div>
          </div>
          <EditProfileModal />
        </section>
      </section>
    </div>
  );
  return content;
}

export default Profile;
