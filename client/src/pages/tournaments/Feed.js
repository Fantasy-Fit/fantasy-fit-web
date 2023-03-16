import React from "react";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="feed">
      <p>I am the Feed</p>
      <p>Posts</p>
      <Posts />
      <p>Notifications (new participant update/new workout)</p>
      <p>Updates</p>
    </div>
  );
}

export default Feed;
