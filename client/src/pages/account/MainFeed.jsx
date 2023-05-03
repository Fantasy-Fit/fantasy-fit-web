import React from 'react';
import './MainFeed.css';

import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import JoinCompetitionModal from "../newcompetition/JoinCompetitionModal";
import RecentWorkouts from './RecentWorkouts';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Link } from "react-router-dom";


function MainFeed({ current_competitions }) {
    const openJoinCompModal = () => {
        const modal = document.getElementById("join-comp-modal");
        modal.style.display = "block";
    };


    return (
        <div className='main__feed'>


            <div className="feed__inputContainer">
                <h3>Recent Workouts</h3>
                <RecentWorkouts />
            </div>



            <div className="feed__inputContainer">
                <h3>Competitions</h3>
                <div className="feed__competitionOptions">
                    <Link to="/new-competition"><AddIcon alt="Make a new competition" /></Link>
                    <GroupAddIcon alt="Join" onClick={openJoinCompModal} />
                </div>
                <div className='current__competitions'>
                    {current_competitions}
                </div>
            </div>
            <JoinCompetitionModal />
        </div>
    )
}

export default MainFeed