import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useGetFriendsQuery } from "../../store/social/friendApiSlice";
import { useGetCompetitionsQuery } from "../../store/game/competitionApiSlice";
import { setCompetitions } from "../../store/game/competitionSlice";
import Sidebar from "./Sidebar";
import MainFeed from "./MainFeed";
import EditProfileModal from "./EditProfileModal";
import CompetitionCard from "./CompetitionCard";
import "./Profile.css";

function Profile() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { data: competitions, isLoading: isCompsLoading, refetch: refetchComps } = useGetCompetitionsQuery(user.id);
  const { data: friends } = useGetFriendsQuery();

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
      <CompetitionCard key={comp.id} comp={comp} />
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
          friends={friends}
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
