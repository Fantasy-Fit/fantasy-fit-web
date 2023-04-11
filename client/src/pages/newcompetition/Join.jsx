import { useState } from 'react';

const Join = () => {
  const [search, setSearch] = useState("");

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch("");
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          name="search"
          placeholder="Find a Competition"
          onChange={handleSearchInput}
          value={search}
        />
        <input
          type="submit"
          value="Search"
        />
      </form>
    </div>
  );
}

export default Join;
