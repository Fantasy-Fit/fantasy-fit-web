import { useSelector } from "react-redux";
import Feed from "./Feed";
import Leaderboard from "./Leaderboard";
import Record from "./Record";
import { useLocation } from "react-router-dom";
import { selectUserCompetitions } from "../../store/auth/userSlice";
import { useGetPostsQuery } from "../../store/game/feedApiSlice";
import "./CompetitionPage.css";

function TournamentPage() {
  const location = useLocation();
  const comp = location.state;
  const compEndDate = new Date(comp.end_date)
  const today = new Date();
  const daysRemaining = Math.ceil((compEndDate - today) / (3_600_000 * 24))

  return (
    <div className="tournament-page">
      <div>
        <div className="tournament-page-header">
          <img src={comp.icon} alt={comp.name} />
          <div>
            <h1> {location?.state.name} </h1>
            <p>Days remaining: {daysRemaining > 0 && daysRemaining || 0}</p>
            <p>End Date: {compEndDate.toUTCString().slice(0, 16)}</p>
          </div>
        </div>
        <div>
          <Leaderboard comp={comp} />
        </div>
        <Feed comp={comp} />
        <Record comp={comp} />
      </div>
    </div>
  );
}

export default TournamentPage;
