import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/userSlice";
import {
  useAddWorkoutMutation,
  useGetWorkoutsQuery,
} from "../../store/game/workoutApiSlice";
import { setLeaderboard } from "../../store/game/leaderboardSlice";
import { useGetLeaderboardQuery } from "../../store/game/leaderboardApiSlice";
import { useGetPostsQuery } from "../../store/game/feedApiSlice";

const activities = [
  "Run",
  "Cycle",
  "Indoor Cycle",
  "Mountain Biking",
  "Swimming",
  "Open Water Swimming",
  "Walking",
  "Strength Training",
  "Cardio",
  "HIIT",
  "Hiking",
  "Skiing",
  "Snowboarding",
  "Ice Skating",
  "Treadmill",
  "Track Run",
  "Rowing",
  "Canoe",
  "Kayak",
  "Sailing",
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
  "Crossfit",
]

function Record({ comp }) {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { refetch: refetchLeaderboard } = useGetLeaderboardQuery(comp.id);
  const { refetch: refetchPosts } = useGetPostsQuery(comp.id);
  const { refetch: refetchWorkouts } = useGetWorkoutsQuery(user.id);
  const [message, setMessage] = useState("");
  const [workoutData, setWorkoutData] = useState({
    activity: "",
    duration: 0,
    intensity: "",
    date: "",
  });
  const [addWorkout, { isLoading }] = useAddWorkoutMutation();

  const [search, setSearch] = useState('')
  const filteredActivities = activities.filter(activity => activity.toLowerCase().includes(search.toLowerCase()))
  
  const handleInput = (e) => {
    if (e.target.name === "duration") {
      setWorkoutData({ ...workoutData, duration: parseInt(e.target.value) });
    } else {
      setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
    }
  };
  const today = new Date();
  const comp_created = comp.created_at.substring(0, 10);

  const createWorkout = async (e) => {
    e.preventDefault();
    try {
      let req = await addWorkout({
        ...workoutData,
        competition_id: comp.id,
      });
      const updatedLeaderboard = [...req.data.leaderboard];
      dispatch(setLeaderboard([...updatedLeaderboard]));
      setMessage("Workout successfully added!");
      refetchLeaderboard();
      refetchPosts();
      refetchWorkouts();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const timer = () =>
      setTimeout(() => {
        setMessage("");
      }, 3000);

    return () => timer();
  }, [message]);

  return (
    <div className="record-workout-container">
      <div>
        <h2>Record Workout</h2>
        <form onSubmit={createWorkout} className="record-workout-form">
          <input
            type="text"
            id="combobox"
            placeholder="Type a name to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            list="options"
            autoComplete="off"
          />
          <datalist
            id="options"
          >
            {activities.sort().map((activity) => {
              return <option key={activity} value={activity}></option>;
            })}
          </datalist>

          <label htmlFor="duration">Duration (mins):</label>
          <input
            type="number"
            placeholder="Duration in minutes"
            name="duration"
            min={1}
            max={60 * 24}
            value={Number(workoutData.duration)}
            onChange={handleInput}
          />
          <select
            onChange={handleInput}
            name="intensity"
            defaultValue="default"
          >
            <option value="default" hidden disabled>
              Select Intensity
            </option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            placeholder="MM/DD/YYYY"
            name="date"
            min={comp_created}
            max={today.toISOString().substring(0, 10)}
            value={workoutData.date}
            onChange={handleInput}
          />
          <input
            type="submit"
            value="Add Workout"
            className="add-workout-submit"
          />
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Record;
