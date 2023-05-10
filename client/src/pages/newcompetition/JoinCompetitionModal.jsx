import { useEffect } from "react";
import Join from "./Join";
import "./NewCompetition.css";

const JoinCompetitionModal = () => {
    const modal = document.getElementById("join-comp-modal");
    const closeJoinCompModal = () => {
        modal.style.display = 'none';
    }

    useEffect(() => {
        window.onclick = (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        }
    }, [modal]);

    return (
        <div id="join-comp-modal">
            <div className="modal-content">
                <h2>Join a Competition</h2>
                <Join />
                <button className="join-comp-button" onClick={closeJoinCompModal}>Cancel</button>
            </div>
        </div>
    )
}

export default JoinCompetitionModal; 