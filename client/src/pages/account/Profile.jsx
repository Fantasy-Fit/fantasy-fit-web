import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useGetCompetitionsQuery } from "../../store/game/competitionApiSlice";
import { setCompetitions } from "../../store/game/competitionSlice";
import Sidebar from "./Sidebar";
import MainFeed from "./MainFeed";
import EditProfileModal from "./EditProfileModal";
import "./Profile.css";

function Profile() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
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
