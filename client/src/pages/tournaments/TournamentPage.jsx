import React from "react";
import Feed from "./Feed";
import Leaderboard from "./Leaderboard";
import Record from "./Record";

function TournamentPage() {
  return (
    <div className="tournament-page">
      <h1>Tournament Page</h1>
      <Feed />
      <Leaderboard />
      <Record />
    </div>
  );
}

export default TournamentPage;
