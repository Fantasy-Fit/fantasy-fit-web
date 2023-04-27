import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/auth/userSlice';
// import { selectUserWorkouts } from '../../store/auth/userSlice';
import { useGetWorkoutsQuery } from '../../store/game/workoutApiSlice';
import { setUserWorkouts } from '../../store/game/workoutSlice';

const RecentWorkouts = () => {
    // const workouts = useSelector(selectUserWorkouts);
    const user = useSelector(selectCurrentUser);
    const { data: userWorkouts, isLoading, refetch } = useGetWorkoutsQuery(user.id);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     refetch();
    // }, []);

    // useEffect(() => {
    //     // if (userWorkouts) {
    //     //     return
    //     // }
    //     if (isLoading) {
    //         return;
    //     } else {
    //         dispatch(setUserWorkouts(userWorkouts));
    //     }
    // }, [userWorkouts]);

    const mapWorkouts = userWorkouts?.slice(-10).map((workout) => {
        return (
            <tr key={workout.id}>
                <td>{workout.activity}</td>
                <td>{workout.duration}</td>
                <td>{workout.intensity}</td>
                <td>{workout.calories}</td>
                <td>{workout.points}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Activity</th>
                    <th>Duration</th>
                    <th>Intensity</th>
                    <th>Calories</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {mapWorkouts}
            </tbody>
        </table>
    );
};

export default RecentWorkouts;