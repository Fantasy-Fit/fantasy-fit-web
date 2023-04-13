import { useSelector } from 'react-redux';
import { selectUserWorkouts } from '../../store/auth/userSlice';

const RecentWorkouts = () => {
    const workouts = useSelector(selectUserWorkouts);

    const mapWorkouts = workouts?.slice(-10).map((workout) => {
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