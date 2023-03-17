import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
  logOut,
} from "../../store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

function Profile() {
  const user = useSelector(selectCurrentUser);
  console.log("User from profile:", user);

  const [cookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <p>
        <Link to="/tournament">Flatiron Tournament</Link>
      </p>
      <h3>Past Competitions</h3>
      <p>Recent Workouts</p>
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
