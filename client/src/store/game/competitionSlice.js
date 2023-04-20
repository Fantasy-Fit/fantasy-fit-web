import { useSelector } from 'react-redux';
import { selectCompetitions } from '../../store/competition/competitionSlice';

const Competitions = () => {
  const competitions = useSelector(selectCompetitions);

  return (
    <div>
      {competitions.list.map((competition) => (
        <div key={competition.id}>{competition.name}</div>
      ))}
    </div>
  );
};

export default Competitions;
