import { useState } from 'react';
import { useJoinCompetitionMutation } from '../../store/game/competitionApiSlice';
import { selectCurrentUser } from '../../store/auth/userSlice';
import { useSelector } from 'react-redux';

const Join = () => {
  const [identifier, setIdentifier] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(selectCurrentUser)
  const [joinCompetition, { isLoading }] = useJoinCompetitionMutation();

  const handleIdentifierInput = (e) => {
    setIdentifier(e.target.value);
  };

  const handleJoin = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        throw new Error("User not found");
      }
  
      await joinCompetition({ identifier, user: user.username });
      setIdentifier("");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Could not join competition. Please check the identifier and try again.");
    }
  };

  // console.log(user)

  return (
    <div>
      <form onSubmit={handleJoin}>
        <input
          name="identifier"
          placeholder="Competition Identifier"
          onChange={handleIdentifierInput}
          value={identifier}
        />
        <input
          type="submit"
          value={isLoading ? "Joining..." : "Join"}
          disabled={isLoading}
        />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Join;



