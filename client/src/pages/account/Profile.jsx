import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  logOut,
  selectUserWorkouts,
  selectUserCompetitions,
} from "../../store/auth/userSlice";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/auth/authApiSlice";
import LoadingSpinner from "../auth/LoadingSpinner";


function Profile() {
  const user = useSelector(selectCurrentUser);
  const workouts = useSelector(selectUserWorkouts);
  const competitions = useSelector(selectUserCompetitions);
  const token = user.token;
  const [, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();


  const mapComps = competitions?.map((comp) => {
    return (
      <p key={comp.identifier}>
        <Link to={`/tournament/${comp.id}`} state={comp}>
          {comp.name}
        </Link>
      </p>
    );
  });

  const mapWorkouts = workouts?.map((workout) => {
    return (
      <li key={workout.id}>
        {workout.id}.{workout.activity} -{workout.duration}mins,
        {workout.calories}cals,
        {workout.points}pts
      </li>
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

  const content = (
    <section className="profile">
      <div className="profile-top">
        <img src={user.avatar} alt={user.username} />
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
      <div className="my-profile-competitions">
        <p>Notification/Profile Settings</p>
        <p>Badges / Achievements</p>
        <button>
          <Link to="/new-competition">New Competition</Link>
        </button>
        <h3>Current Competitions</h3>
        {mapComps}
        {/* <h3>Past Competitions</h3> */}
        <p>Recent Workouts</p>
        {mapWorkouts}
        <p>Friends & Followers</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </section>
  );
  return content;
}

export default Profile;
