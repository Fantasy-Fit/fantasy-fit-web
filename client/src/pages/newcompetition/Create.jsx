import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { participantsApiSlice, useGetParticipantsQuery } from "../../store/game/participantsApiSlice";
import { useCreateCompetitionMutation } from "../../store/game/competitionApiSlice";
import GameRules from "./GameRules";
import { setParticipantList } from "../../store/game/participantSlice";
import fitnessIcons from "../../data/fitnessIcons";
import './NewCompetition.css'

function Create() {
  const dispatch = useDispatch();
  const [createCompetition] = useCreateCompetitionMutation();
  const [newCompData, setNewCompData] = useState({
    name: "", public: false, participants: []
  });

  const handleInput = (e) => {
    const getCompValue = (input) => {
      switch (input) {
        case "name":
          return e.target.value;
        case "public":
          return e.target.checked;
        case "participants":
          let participantArray = newCompData.participants;
          if (e.target.checked && !participantArray.includes(e.target.value)) {
            participantArray.push(Number(e.target.value));
          } else if (e.target.checked === false) {
            participantArray = participantArray.filter(id => id !== Number(e.target.value));
          }
          return participantArray;
      }
    }
    setNewCompData({
      ...newCompData,
      [e.target.name]: getCompValue(e.target.name)
    });
  };

  const mapFitnessIcons = Object.values(fitnessIcons).map(icon => {
    return <img key={icon} src={icon} />
  })

  const handleCreateCompetition = async (e) => {
    e.preventDefault();
    try {
      const request = await createCompetition(newCompData).unwrap();
      console.log(request);

    } catch (err) {
      console.error(err.message);
    }

  }

  const { data: participants, isError, isLoading } = useGetParticipantsQuery();

  useEffect(() => {
    if (isLoading) {
      return
    } else {
      dispatch(setParticipantList([...participants]))
    }
  }, [participants]);

  const mapParticipants = participants?.map(participant => {
    return (<div key={participant.id}>
      <input name="participants" type="checkbox" onChange={handleInput} value={participant.id}></input>
      <label htmlFor="participants">{participant.username}</label>
    </div>)
  })

  return (
    <div>
      <form onSubmit={handleCreateCompetition}>

        <label>Choose Competition Icon</label>
        <div className="choose-icon">
          {mapFitnessIcons}
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name of Competition"
          onChange={handleInput}
          required
          value={newCompData.name}
        />
        <label htmlFor="public">Public</label>
        <input
          type="checkbox"
          name="public"
          onChange={handleInput}
          value={newCompData.public}
        />
        {mapParticipants}
        <input
          type="submit"
          value="Create Competition"
        />
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
