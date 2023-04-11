import { useSelector } from "react-redux";
import { selectCurrentUser, selectUserCompetitions } from "../../store/auth/userSlice";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLogoutMutation } from "../../store/auth/authApiSlice";
import RecentWorkouts from "./RecentWorkouts";


function Profile() {
  const user = useSelector(selectCurrentUser);
  const competitions = useSelector(selectUserCompetitions);
  const token = user.token;
  const [, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();


  const mapComps = competitions?.map((comp) => {
    return (
      <div className="competition-card" key={comp.identifier}>
        <img style={{ width: "5em", height: "5em" }} src={comp.icon} />
        <p >
          <Link to={`/tournament/${comp.id}`} state={comp}>
            {comp.name}
          </Link>
        </p>
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
    };
  };

  const content = (
    <section className="profile">
      <div className="profile-top">
        <div className="profile-img-container">
          <img src={user.avatar} alt={user.username} />
        </div>
        <div className="my-profile">
          <h1>My Profile</h1>
          <div className="profile-row">
            <div className="profile-label"><h4>Username:</h4></div>
            <div><p>{user.username}</p></div>
          </div>
          <div className="profile-row">
            <div className="profile-label"><h4>Email:</h4></div>
            <div><p>{user.email}</p></div>
          </div>
          <div className="profile-row">
            <div className="profile-label"><h4>Gender:</h4></div>
            <div><p>{user.gender}</p></div>
          </div>
          <div className="profile-row">
            <div className="profile-label"><h4>Location:</h4></div>
            <div><p>{user.location}</p></div>
          </div>
          <button>Edit Profile</button>
        </div>
      </div>
      <div className="new-competition-container">
        {/* <p>Notification/Profile Settings</p> */}
        {/* <p>Badges / Achievements</p> */}
        <div className="new-competition">
          <img src="https://cdn-icons-png.flaticon.com/512/4959/4959925.png" />
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
      <div className="current-competition-container">
        <div className="current-competition-container-inner">
          <h2>Current Competitions</h2>
          <div>
            {mapComps}
          </div>
          {/* <h3>Past Competitions</h3> */}
          <h3>Recent Workouts</h3>
          <RecentWorkouts />
          <p>Friends & Followers [To be Built]</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </section>
  );
  return content;
}

export default Profile;
