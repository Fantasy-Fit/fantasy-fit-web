import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCompetitionMutation } from "../../store/game/competitionApiSlice";
import { setParticipantList } from "../../store/game/participantSlice";
import fitnessIcons from "../../data/fitnessIcons";
import './NewCompetition.css'
import { selectCurrentUser } from "../../store/auth/userSlice";
import { addCompetition } from "../../store/game/competitionSlice";
import { useGetFriendsQuery } from "../../store/social/friendApiSlice";

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [createCompetition] = useCreateCompetitionMutation();
  const [newCompData, setNewCompData] = useState({
    name: "", public: false, participants: [currentUser.id], icon: "", start_date: "", end_date: ""
  });

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [validationMessages, setValidationMessages] = useState("");
  const today = new Date();
  const maxStartDate = new Date(Date.parse(today) + 3_600_000 * 24 * 30);
  const maxEndDate = new Date((Date.parse(newCompData.start_date) || Date.parse(today)) + 3_600_000 * 24 * 365);

  const handleInput = (e) => {
    const getCompValue = (input) => {
      switch (input) {
        case "name":
          return e.target.value;
        case "start_date":
          return e.target.value;
        case "end_date":
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
    if (newCompData.participants.length < 1) {
      throw new Error("You need to select at least 1 participants!");
    }
    if (newCompData.name.length < 5) {
      throw new Error("Competition Name must be at least 5 characters!");
    }
    if (!newCompData.start_date) {
      throw new Error("You haven't selected a start date!")
    }
    if (!newCompData.end_date) {
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
      dispatch(addCompetition(request));
      navigate('/profile');
    } catch (err) {
      console.error(err.message);
    }
  };

  const { data: friends, isLoading } = useGetFriendsQuery();

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      dispatch(setParticipantList([...friends]));
    }
  }, [friends]);

  const acceptedFriends = friends?.filter(friend => friend.status === "accepted");

  const mapParticipants = () => {
    if (acceptedFriends) {
      return acceptedFriends.map(participant => {
        return (<div key={participant.id}>
          <div>
            <input name="participants" type="checkbox" onChange={handleInput} value={participant.id}></input>
            <label htmlFor="participants">{participant.friend_username}</label>
            <img src={participant.friend_avatar} style={{ width: "40px", height: "40px" }} />
          </div>
        </div>);
      });
    };
  };

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

          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            name="start_date"
            onChange={handleInput}
            min={today.toISOString().substring(0, 10)}
            max={maxStartDate.toISOString().substring(0, 10)}
            value={newCompData.start_date}
          />
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            name="end_date"
            min={newCompData.start_date}
            max={maxEndDate?.toISOString().substring(0, 10)}

            onChange={handleInput}
            value={newCompData.end_date}
          />
          <div className="select-participants">
            <label>Select Participants:</label>
            <div key="current-user">
              <div>
                <input name="participants" type="checkbox" value={currentUser.id} checked disabled></input>
                <label htmlFor="participants">{currentUser.username}</label>
                <img src={currentUser.avatar} style={{ width: "40px", height: "40px" }} />
              </div>
            </div>
            {mapParticipants()}
          </div>
          <input
            type="submit"
            value="Create Competition"
          />
        </form>
        {validationMessages && <p style={{ color: "red" }}>{validationMessages}</p>}

        {/* <h3>Game Rules</h3>
        <GameRules />
        <p>$$ / ForFun / Chartity</p>
        <p>Duration</p>
        <p>Start Date</p>
        <p>Invite Participants</p> */}
      </div>
    </div>
  );
}

export default Create;
