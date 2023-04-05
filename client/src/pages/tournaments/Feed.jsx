import React from "react";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="feed">
      <h2>Competition Feed</h2>
      <Posts />
      <p>Notifications (new participant update/new workout)</p>
      <p>Updates</p>
    </div>
  );
}

export default Feed;
