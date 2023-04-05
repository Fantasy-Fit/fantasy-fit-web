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

  // console.log("User from profile:", user, cookie);
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
      <img src={user.avatar} alt={user.username} />
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <p>Notification/Profile Settings</p>
      <p>Badges / Achievements</p>
      <p>
        <Link to="/new-competition">New Competition</Link>
      </p>
      <h3>Current Competitions</h3>
      {mapComps}
      <h3>Past Competitions</h3>
      <p>Recent Workouts</p>
      {mapWorkouts}
      <p>Friends & Followers</p>
      <button onClick={handleLogout}>Log out</button>
    </section>
  );
  return content;
}

export default Profile;
