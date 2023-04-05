import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useAddWorkoutMutation } from "../../store/game/workoutApiSlice";
import { selectLeaderboard, setLeaderboard } from "../../store/game/leaderboardSlice";

const activities = ["Run", "Cycle", "Indoor Cycle", "Mountain Biking", "Swimming",
  "Open Water Swimming", "Walking", "Strength Training", "Cardio", "HIIT", "Hiking", "Skiing", "Snowboarding", "Ice Skating", "Treadmill", "Track Run", "Rowing", "Canoe",
  "Kayak", "Sailing",
  "Skateboarding",
  "Surfing",
  "Indoor Row",
  "Standup Paddle Boarding",
  "Yoga",
  "Pilates",
  "Dance",
  "Tai Chi",
  "Core Training",
  "Floor Climb",
  "Elliptical",
  "Indoor Climbing",
  "Chess",
  "Tennis",
  "Squash",
  "Basketball",
  "Soccer",
  "American Football",
  "Golf",
  "Crossfit"]

function Record({comp}) {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const leaderboard = useSelector(selectLeaderboard);
  console.log(leaderboard)
  const [message, setMessage] = useState("");
  const [workoutData, setWorkoutData] = useState({
    activity: "", duration: 0, intensity: "", date: ""
  })
  const [addWorkout, { isLoading }] = useAddWorkoutMutation();

  const handleInput = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value })
  }

  const createWorkout = async (e) => {
    e.preventDefault();
    try {
      let req = await addWorkout({
        ...workoutData,
        user_id: user.id,
        competition_id: comp.id // will need to update this after client side routing is done for tournament page
      })

      setMessage("Workout successfully added!")
      const updatedBoard = req.data.leaderboard
      dispatch(setLeaderboard([...updatedBoard]))
      console.log(req.data)
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <h3>Record Workout</h3>
      <form onSubmit={createWorkout}>
        <select onChange={handleInput} name="activity">
          <option defaultValue disabled hidden>Select Activity</option>
          {activities.map(activity => {
            return (<option key={activity}>{activity}</option>)
          })}
        </select>
        <input
          type="number"
          placeholder="Duration in minutes"
          name="duration"
          value={workoutData.duration}
          onChange={handleInput}
        />
        <select
          onChange={handleInput}
          name="intensity"
        >
          <option defaultValue disabled hidden>Select Intensity</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          type="date"
          placeholder="MM/DD/YYYY"
          name="date"
          value={workoutData.date}
          onChange={handleInput}
        />
        <input
          type="submit"
          value="Add Workout"
        />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Record;
