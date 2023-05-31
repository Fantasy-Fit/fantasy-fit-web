import { Link } from 'react-router-dom';
import "./CompetitionCard.css";

const CompetitionCard = ({ comp }) => {
    const compEndDate = new Date(comp.end_date);
    const today = new Date();
    const daysRemaining = Math.max(0, Math.ceil((compEndDate - today) / (3_600_000 * 24)));

    return (
        <div className="competition-card" key={comp.identifier}>
            <div className="competition-card__top">
                <Link to={`/tournament/${comp.id}`} state={comp}>
                    <img src={comp.icon} />
                </Link>
                <Link to={`/tournament/${comp.id}`} state={comp}>
                    <p>{comp.name.length > 15 ? comp.name.slice(0, 9) + "..." : comp.name}</p>
                </Link>
            </div>
            <div className="competition-card__bottom">
                <p># Players: {comp.users.length - 1}</p>
                <p>Days left: {daysRemaining}</p>
            </div>
        </div>
    )
};

export default CompetitionCard;