import { useSelector } from "react-redux";
import Feed from "./Feed";
import Leaderboard from "./Leaderboard";
import Record from "./Record";
import { useLocation } from "react-router-dom";
import { selectLeaderboard } from "../../store/game/leaderboardSlice";
import "./CompetitionPage.css";
import finishLine from "../../assets/finishline.png";

function TournamentPage() {
  const location = useLocation();
  const comp = location.state;
  const leaderboard = useSelector(selectLeaderboard);
  const compEndDate = new Date(comp.end_date);
  const today = new Date();
  const daysRemaining = Math.ceil((compEndDate - today) / (3_600_000 * 24));

  return (
    <div className="tournament-page">
      <div>
        <div className="tournament-page-header">
          <img src={comp.icon} alt={comp.name} />
          <h1> {location?.state.name} </h1>
          <div className="tournament-details">
            <p>ID: {comp.identifier}</p>
            <p>{comp.public ? "Public ✅" : "Private 🔒"}</p>
            <p>{daysRemaining > 0 && daysRemaining || 0} days to go!</p>
            <p>Ends: {compEndDate.toUTCString().slice(0, 16)}</p>
          </div>
        </div>
        {daysRemaining <= 0 &&
          <div className="tournament-finished">
            <h2>Competition Finished!</h2>
            <h3>Congratulations to 🥇 {leaderboard[0]?.username}
              🥈 {leaderboard[1]?.username}, and
              🥉 {leaderboard[2]?.username}!
            </h3>
            {/* <img src="../../../public/finishline.png" alt="finish-line" /> */}
            <img src={finishLine} alt="finish-line" />
          </div>
        }
        <div className="tournament-page-top-content">
          <Leaderboard comp={comp} />
          {daysRemaining > 0 && <Record comp={comp} />}
        </div>
        <Feed comp={comp} />
      </div>
    </div>
  );
}

export default TournamentPage;
