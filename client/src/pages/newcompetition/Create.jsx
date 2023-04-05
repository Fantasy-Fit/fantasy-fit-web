import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetParticipantsQuery } from "../../store/game/participantsApiSlice";
import GameRules from "./GameRules";
import { setParticipantList } from "../../store/game/participantSlice";

function Create() {
  const dispatch = useDispatch();
  const [newCompData, setNewCompData] = useState({
    compName: "", isPublic: false
  });

  const handleInput = (e) => {
    setNewCompData({ ...newCompData, [e.target.name]: e.target.value });
  };

  const handleCreateCompetition = () => {

  }

  const { data: participants, isError, isLoading } = useGetParticipantsQuery();


  useEffect(() => {
    console.log(participants, isError, isLoading)
    if (isLoading) {
      return
    } else {
      dispatch(setParticipantList([...participants]))
    }
  }, [participants]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="compName"
          placeholder="Name of Competition"
          onChange={handleInput}
          required
          value={newCompData.name}
        />
        <label htmlFor="isPublic">Public</label>
        <input
          type="checkbox"
          name="isPublic"
          onChange={handleInput}
          value={newCompData.isPublic}
        />
        <select name="participants" onChange={handleInput} multiple>
          <option
            value="none"
            defaultValue
            disabled
            hidden
          >Select Participants
          </option>
          {participants?.map(participant => {
            return (<option key={participant.id}>{participant.username}</option>)
          })}
        </select>
        <button onClick={handleCreateCompetition}>Create Competition</button>
      </form>

      <h3>Game Rules</h3>
      <GameRules />
      <p>$$ / ForFun / Chartity</p>
      <p>Duration</p>
      <p>Start Date</p>
      <p>Invite Participants</p>
    </div>
  );
}

export default Create;
