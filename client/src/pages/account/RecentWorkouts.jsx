
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/userSlice";
import {
  useGetWorkoutsQuery,
  useDeleteWorkoutMutation,
} from "../../store/game/workoutApiSlice";
import {
  updateAfteDelete,
  setWorkouts,
  selectCurrentWorkouts,
} from "../../store/game/workoutSlice";

const RecentWorkouts = () => {
  const user = useSelector(selectCurrentUser);
  const currentWorkouts = useSelector(selectCurrentWorkouts);

  const { data: userWorkouts, isLoading, refetch } = useGetWorkoutsQuery(user.id);

  const dispatch = useDispatch();
  const [deleteWorkout] = useDeleteWorkoutMutation();

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      dispatch(setWorkouts([...userWorkouts]));
    }
  }, [userWorkouts]);


  const mapWorkouts = currentWorkouts?.slice(-10).map((workout) => {
    const workoutDate = new Date(workout.date)
    return (
      <tr key={workout.id}>
        <td>{workoutDate.toUTCString().slice(5, 12)}</td>
        <td>{workout.activity}</td>
        <td>{workout.duration}</td>
        <td>{workout.intensity}</td>
        <td>{workout.calories}</td>
        <td>{workout.points}</td>
        <td>
          {(Date.now() - new Date(workout.created_at).getTime()) /
            (60 * 60 * 24 * 1000) <
            2 && (
              <button
                onClick={() => {
                  deleteWorkout(workout.id);
                  dispatch(updateAfteDelete(workout.id));
                  refetch()
                }}
              >
                Delete
              </button>
            )}
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Activity</th>
          <th>Duration</th>
          <th>Intensity</th>
          <th>Calories</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>{mapWorkouts}</tbody>
    </table>
  );
};

export default RecentWorkouts;
