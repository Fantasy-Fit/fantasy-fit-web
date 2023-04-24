import { useState } from 'react';
import { useSearchCompetitionsQuery } from '../../store/game/competitionApiSlice';
import { useJoinCompetitionMutation } from '../../store/game/competitionApiSlice';
import { selectCurrentUser } from '../../store/auth/userSlice';
import { useSelector } from 'react-redux';

const Join = () => {
  const [identifier, setIdentifier] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(selectCurrentUser);
  const [joinCompetition, { isLoading }] = useJoinCompetitionMutation();
  const { data, refetch } = useSearchCompetitionsQuery(searchQuery);

  const handleIdentifierInput = (e) => {
    setIdentifier(e.target.value);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let req = await joinCompetition({
        identifier: identifier,
        user: user
      });

      console.log(req)
      if (!!req.error) {
        throw new Error("err msg")
      }
      setIdentifier("");
      setErrorMessage("");

    } catch (error) {
      setErrorMessage("Could not join competition. Please check the identifier and try again.");
    }
  };

  const handleSearchComp = (e) => {
    e.preventDefault();
    setSearchQuery(identifier);
    refetch();
  };

  const mapSearchResults = data?.map((result, index) => {
    return (<ul key={index}>
      <img src={result.icon} alt="comp icon" />
      <p>{result.identifier}: {result.name}</p>
      <button onClick={handleJoin}>Join Comp</button>
    </ul>)
  })

  return (
    <div>
      <form onSubmit={handleSearchComp}>
        <input
          name="identifier"
          placeholder="Competition Identifier"
          onChange={handleIdentifierInput}
          value={identifier}
        />
        <input
          type="submit"
          value={isLoading ? "Joining..." : "Search"}
          disabled={isLoading}
        />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {mapSearchResults}
    </div>
  );
};

export default Join;



