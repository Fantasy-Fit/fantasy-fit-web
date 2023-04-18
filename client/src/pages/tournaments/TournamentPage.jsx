import { useSelector } from 'react-redux';
import Feed from "./Feed";
import Leaderboard from "./Leaderboard";
import Record from "./Record";
import { useLocation } from "react-router-dom";
import { selectUserCompetitions } from '../../store/auth/userSlice';
import './CompetitionPage.css';

function TournamentPage() {
  const location = useLocation();
  const comp = location.state;
  const competition = useSelector(selectUserCompetitions).find(competition => competition.id === comp.id)

  return (
    <div className="tournament-page">
      <div>
        <div className="tournament-page-header">
          <img src={competition.icon} alt={competition.name} />
          <h1> {location.state.name} </h1>
        </div>
        <Feed />
        <div>
          <Leaderboard comp={comp} />
        </div>
        <Record comp={comp} />
      </div>

    </div>
  );
}

export default TournamentPage;
