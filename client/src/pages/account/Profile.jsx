import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  logOut,
  selectUserWorkouts,
  selectUserCompetitions,
} from "../../store/auth/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";


function Profile() {
  const user = useSelector(selectCurrentUser);
  const workouts = useSelector(selectUserWorkouts);
  const competitions = useSelector(selectUserCompetitions);
  const [, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mapComps = competitions?.map(comp => {
    return (
      <li key={comp.identifier}>{comp.name}</li>
    )
  })

  const mapWorkouts = workouts?.map(workout => {
    return (
      <li key={workout.id}>
        {workout.id}.
        {workout.activity} -
        {workout.duration}mins,
        {workout.calories}cals,
        {workout.points}pts
      </li>
    )
  })

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
      <p>
        <Link to="/tournament">Flatiron Tournament</Link>
      </p>
      <h3>Past Competitions</h3>
      <p>Recent Workouts</p>
      {mapWorkouts}
      <p>Friends & Followers</p>
      <button
        onClick={() => {
          dispatch(logOut());
          removeCookie("token");
          localStorage.clear();
          navigate("/");
        }}
      >
        Log out
      </button>
    </section>
  );
  return content;
}

export default Profile;
