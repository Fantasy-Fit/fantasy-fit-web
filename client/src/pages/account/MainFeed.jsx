import './MainFeed.css';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import JoinCompetitionModal from "../newcompetition/JoinCompetitionModal";
import RecentWorkouts from './RecentWorkouts';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import InputOption from './InputOption';
import { Link } from "react-router-dom";


function MainFeed({ current_competitions }) {
    const openJoinCompModal = () => {
        const modal = document.getElementById("join-comp-modal");
        modal.style.display = "block";
    };

    return (
        <div className='main__feed'>
            <div className="feed__inputContainer">
                <h3>Competitions</h3>
                <div className="feed__competitionOptions">
                    <Link to="/new-competition">
                        <InputOption Icon={FitnessCenterIcon} title="New " color="#70B5F9" />
                    </Link>
                    <div onClick={openJoinCompModal}>
                        <InputOption
                            Icon={SportsHandballIcon}
                            title="Join"
                            color="#000"
                            openModal={openJoinCompModal}

                        />
                    </div>
                </div>
                <div className='current__competitions'>
                    {current_competitions}
                </div>
            </div>
            <div className="feed__inputContainer">
                <h3>Recent Workouts</h3>
                <RecentWorkouts />
            </div>
            <JoinCompetitionModal />
        </div>
    )
}

export default MainFeed