import { useState } from "react";
import {
  useSearchCompetitionsQuery,
  useJoinCompetitionMutation,
  useGetCompetitionsQuery,
} from "../../store/game/competitionApiSlice";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useSelector } from "react-redux";
import "./Join.css";

const Join = () => {
  const [identifier, setIdentifier] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(selectCurrentUser);
  const [joinCompetition, { isLoading }] = useJoinCompetitionMutation();
  const { data, refetch } = useSearchCompetitionsQuery(searchQuery);
  const { refetch: refetchCompetitions } = useGetCompetitionsQuery(user.id);

  const handleIdentifierInput = (e) => {
    setIdentifier(e.target.value);
  };

  const handleJoin = async (e, comp_identifier) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let req = await joinCompetition({
        identifier: comp_identifier,
        user: user,
      });

      if (!!req.error) {
        throw new Error(String(req.error.data.error));
      } else if (!!req.data) {
        console.log(req.data);
      }
      refetchCompetitions();
      setIdentifier("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSearchComp = (e) => {
    e.preventDefault();
    setSearchQuery(identifier);
    refetch();
  };

  const mapSearchResults = data?.map((result, index) => {
    return (
      <ul key={index}>
        <img src={result.icon} alt="comp icon" />
        <p>
          {result.identifier}: {result.name}
        </p>
        <button onClick={(e) => handleJoin(e, result.identifier)}>
          Join Comp
        </button>
      </ul>
    );
  });

  return (
    <div>
      <form className="join-form" onSubmit={handleSearchComp}>
        <input
          className="join-form-search-input"
          name="identifier"
          placeholder="Search by name or identifier..."
          onChange={handleIdentifierInput}
          value={identifier}
        />
        <input
          type="submit"
          value={isLoading ? "Joining..." : "Search"}
          disabled={isLoading}
        />
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="search-results">
        {mapSearchResults}
      </div>
    </div>
  );
};

export default Join;
