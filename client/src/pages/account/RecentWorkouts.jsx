import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/auth/userSlice';
import { useGetWorkoutsQuery } from '../../store/game/workoutApiSlice';

const RecentWorkouts = () => {
    const user = useSelector(selectCurrentUser);
    const { data: userWorkouts } = useGetWorkoutsQuery(user.id);

    const mapWorkouts = userWorkouts?.slice(-10).map((workout) => {
        const workoutDate = new Date(workout.date)
        return (
            <tr key={workout.id}>
                <td>{workoutDate.toUTCString().slice(5, 12)}</td>
                <td>{workout.activity}</td>
                <td>{workout.duration}</td>
                <td>{workout.intensity}</td>
                <td>{workout.points}</td>
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