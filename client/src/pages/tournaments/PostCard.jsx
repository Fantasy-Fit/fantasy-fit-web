import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useDeletePostMutation } from "../../store/game/feedApiSlice";
import { updateAfteDelete, selectFeedState } from "../../store/game/feedSlice";

function PostCard({ post }) {
  const user = useSelector(selectCurrentUser);
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{post.user?.username}</h3>
      <p>{post.description}</p>
      {post?.user_id === user.id && (
        <button
          onClick={() => {
            deletePost(post.id);
            dispatch(updateAfteDelete(post));
          }}
        >
          delete
        </button>
      )}
    </div>
  );
}

export default PostCard;
