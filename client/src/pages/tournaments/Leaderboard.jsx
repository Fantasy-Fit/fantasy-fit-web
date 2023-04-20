
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetLeaderboardQuery } from "../../store/game/leaderboardApiSlice";
import { setLeaderboard } from "../../store/game/leaderboardSlice";
// import { useSelector } from "react-redux";
// import { selectLeaderboard } from "../../store/game/leaderboardSlice";

function Leaderboard({ comp }) {
  const dispatch = useDispatch();
  const competitionID = comp.id;
  const { data: leaderboard, isLoading } =
    useGetLeaderboardQuery(competitionID);

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      dispatch(setLeaderboard([...leaderboard]));
    }
  }, [leaderboard]);

  const mapLeaderboard = leaderboard?.map((position, index) => {
    return (
      <tr key={position.id} className={`table-row-${index + 1}`}>
        <td>{index + 1}</td>
        <td>{position.username}</td>
        <td>{position["user_total_points"]}</td>
      </tr>
    );
  });


  return (
    <div className="leaderboard-container">
      <div>
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{mapLeaderboard}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
