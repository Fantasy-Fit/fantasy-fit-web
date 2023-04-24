import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetParticipantsQuery } from "../../store/game/participantsApiSlice";
import { useCreateCompetitionMutation } from "../../store/game/competitionApiSlice";
import GameRules from "./GameRules";
import { setParticipantList } from "../../store/game/participantSlice";
import fitnessIcons from "../../data/fitnessIcons";
import './NewCompetition.css'

function Create() {
  const dispatch = useDispatch();
  const [createCompetition] = useCreateCompetitionMutation();
  const [newCompData, setNewCompData] = useState({
    name: "", public: false, participants: [], icon: "", startDate: "", endDate: ""
  });
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [validationMessages, setValidationMessages] = useState("");
  const today = new Date();
  const maxStartDate = new Date(Date.parse(today) + 3_600_000 * 24 * 30);
  const maxEndDate = new Date((Date.parse(newCompData.startDate) || Date.parse(today)) + 3_600_000 * 24 * 365);

  const handleInput = (e) => {
    const getCompValue = (input) => {
      switch (input) {
        case "name":
          return e.target.value;
        case "startDate":
          return e.target.value;
        case "endDate":
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

  const mapFitnessIcons = Object.entries(fitnessIcons).map(([i, icon]) => {
    return (<img
      key={icon}
      src={icon}
      style={selectedIcon ? {
        border: selectedIcon === i ? "1px solid lightgray" : null,
        borderRadius: selectedIcon === i ? "10px" : 0,
        backgroundColor: selectedIcon === i ? "green" : null,
      }
        : null
      }
      onClick={() => {
        setNewCompData({ ...newCompData, "icon": icon });
        selectedIcon === i ? setSelectedIcon(null) : setSelectedIcon(i);

      }}
    />);
  });

  const validateCompetitionData = () => {
    if (!selectedIcon) {
      throw new Error("You haven't selected a competition Icon!");
    }
    if (newCompData.participants.length <= 1) {
      throw new Error("You need to select at least 2 participants!");
    }
    if (newCompData.name.length < 5) {
      throw new Error("Competition Name must be at least 5 characters!");
    }
    if (!newCompData.startDate) {
      throw new Error("You haven't selected a start date!")
    }
    if (!newCompData.endDate) {
      throw new Error("You haven't selected an end date!")
    }
  };

  const handleCreateCompetition = async (e) => {
    e.preventDefault();
    try {
      validateCompetitionData();
    } catch (err) {
      setValidationMessages(err.message);
      console.error(err.message);
      return;
    }

    try {
      const request = await createCompetition(newCompData).unwrap();
      console.log(request);
    } catch (err) {
      console.error(err.message);
    }
  };

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
      <div>
        <input name="participants" type="checkbox" onChange={handleInput} value={participant.id}></input>
        <label htmlFor="participants">{participant.username}</label>
      </div>
    </div>)
  })

  return (
    <div className="create-competition-container">
      <div className="create-competition-container-inner">
        <h1>Create a New Competition</h1>
        <form onSubmit={handleCreateCompetition}>

          <label>Choose Competition Icon</label>
          <div className="choose-icon">
            <div>
              {mapFitnessIcons}
            </div>
          </div>
          <div>
            <label htmlFor="name">Competition Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Name of Competition"
              onChange={handleInput}
              required
              value={newCompData.name}
            />
          </div>

          <div className="is-public-checkbox">
            <label htmlFor="public">Public:</label>
            <input
              type="checkbox"
              name="public"
              onChange={handleInput}
              value={newCompData.public}
            />
          </div>

          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            name="startDate"
            onChange={handleInput}
            min={today.toISOString().substring(0, 10)}
            max={maxStartDate.toISOString().substring(0, 10)}
            value={newCompData.startDate}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            name="endDate"
            min={newCompData.startDate}
            max={maxEndDate?.toISOString().substring(0, 10)}

            onChange={handleInput}
            value={newCompData.endDate}
          />
          <div className="select-participants">
            <label>Select Participants:</label>
            {mapParticipants}
          </div>
          <input
            type="submit"
            value="Create Competition"
          />
        </form>
        {validationMessages && <p style={{ color: "red" }}>{validationMessages}</p>}

        <h3>Game Rules</h3>
        <GameRules />
        <p>$$ / ForFun / Chartity</p>
        <p>Duration</p>
        <p>Start Date</p>
        <p>Invite Participants</p>
      </div>
    </div>
  );
}

export default Create;
