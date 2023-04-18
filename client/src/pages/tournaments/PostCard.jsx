import React from "react";

function PostCard({ post }) {
  return (
    <div>
      <h3>{post.user.username}</h3>
      <p>{post.description}</p>
      <button>delete</button>
    </div>
  );
}

export default PostCard;
