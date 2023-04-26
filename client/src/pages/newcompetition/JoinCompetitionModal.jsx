import { useEffect } from "react";
import Join from "./Join";
import "./NewCompetition.css";

const JoinCompetitionModal = () => {
    const closeJoinCompModal = () => {
        const modal = document.getElementById("join-comp-modal");
        modal.style.display = 'none';
    }

    useEffect(() => {
        const modal = document.getElementById("join-comp-modal");

        window.onclick = (e) => {
            console.log(e.target)
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        }
    }, []);

    return (
        <div id="join-comp-modal">
            <div className="modal-content">
                <h2>Join a Competition</h2>
                <p>Search for a competition by identifier:</p>
                <Join />
                <button onClick={closeJoinCompModal}>Cancel</button>
            </div>
        </div>
    )
}

export default JoinCompetitionModal; 