import React from "react";
import Feed from "./Feed";
import Leaderboard from "./Leaderboard";
import Record from "./Record";
import { useLocation } from "react-router-dom";

function TournamentPage() {
  const location = useLocation();
  const comp = location.state;

  return (
    <div className="tournament-page">
      <h1> {location.state.name} Page</h1>
      <Feed comp={comp} />
      <Leaderboard comp={comp} />
      <Record comp={comp} />
    </div>
  );
}

export default TournamentPage;
