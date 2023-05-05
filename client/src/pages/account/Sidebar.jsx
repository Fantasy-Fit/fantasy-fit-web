import { useSelector } from 'react-redux';
import { selectCurrentCompetitions } from '../../store/game/competitionSlice';
import { selectCurrentWorkouts } from '../../store/game/workoutSlice';
import Avatar from '@mui/material/Avatar';
import './Sidebar.css';

function Sidebar({ image, username, email, gender, location, friends }) {
  const currentCompetitions = useSelector(selectCurrentCompetitions);
  const currentWorkouts = useSelector(selectCurrentWorkouts);

  const openEditProfileModal = () => {
    const modal = document.getElementById("edit-profile-modal");
    modal.style.display = "block";
  };

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className='sidebar__hash'>#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://media.istockphoto.com/id/1151850199/photo/sports-equipment-and-accessories-shoes-dumbbells-on-green-background.jpg?s=612x612&w=0&k=20&c=OStHn9MFqxyvOPVbo8qr_MHaivayxrs1mnL2APzRAis="
          alt=""
        />
        <Avatar
          onClick={openEditProfileModal}
          className="sidebar__avatar"
          sx={{ width: "5em", height: "5em" }}
        >
          <img id="sidebar__top__avatar" src={image} alt={username} />
        </Avatar>
        <h2>{username}</h2>
        <h4>{email}</h4>
        <h4>{gender}</h4>
        <h4>{location}</h4>
        <button onClick={openEditProfileModal}>Edit Profile</button>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p># Friends</p>
          <p className="sidebar__statNumber">{friends?.length}</p>
        </div>
        <div className="sidebar__stat">
          <p># Competitions</p>
          <p className="sidebar__statNumber">{currentCompetitions?.length}</p>
        </div>
        <div className="sidebar__stat">
          <p># Workouts</p>
          <p className="sidebar__statNumber">{currentWorkouts?.length}</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("mycompetitions")}
        {recentItem("running")}
        {recentItem("gymlife")}
        {recentItem("compwars")}
        {recentItem("musclemania")}
      </div>
    </div>
  );
};

export default Sidebar;