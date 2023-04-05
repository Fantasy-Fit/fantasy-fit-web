import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLeaderboardQuery } from "../../store/game/leaderboardApiSlice";
import { setLeaderboard } from '../../store/game/leaderboardSlice';
import { selectLeaderboard } from "../../store/game/leaderboardSlice";

function Leaderboard() {
  const dispatch = useDispatch();
  const competitionID = 1 // change to dynamic competition ID with nested routing (useParams)
  const { data: leaderboard, isLoading } = useGetLeaderboardQuery(competitionID);

  const leaders = useSelector(selectLeaderboard)
  console.log("In Leaderboard component:", leaders)

  useEffect(() => {
    if (isLoading) {
      return
    } else {
      dispatch(setLeaderboard([...leaderboard]))
    }
  }, [leaderboard])


  const mapLeaderboard = leaderboard?.map((position, index) => {
    return (<tr key={position.id}>
      <td>{index + 1}</td>
      <td>{position.username}</td>
      <td>{position["user_total_points"]}</td>
    </tr>)
  })

  return (
    <div>
      <p>Leaderboard</p>
      <p>TABLE OF PARTICIPANTS WITH POINT RANKING</p>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {mapLeaderboard}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
