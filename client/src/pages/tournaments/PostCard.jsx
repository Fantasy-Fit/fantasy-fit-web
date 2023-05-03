import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useDeletePostMutation } from "../../store/game/feedApiSlice";
import { updateAfteDelete } from "../../store/game/feedSlice";
import { useCreateLikeMutation, useDeleteLikeMutation } from '../../store/game/likeApiSlice';
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import "./PostCard.css"

function PostCard({ post }) {
  const user = useSelector(selectCurrentUser);
  const [deletePost] = useDeletePostMutation();
  const [createLikePost] = useCreateLikeMutation();
  const [deleteLikePost] = useDeleteLikeMutation();
  const dispatch = useDispatch();
  const postDate = new Date(post.created_at);
  const [likeStatus, setLikeStatus] = useState({ isLike: false, num_of_likes: 0 });
  const formattedPostDate =
    postDate.toUTCString().slice(17, 22) + " - " +
    postDate.toUTCString().slice(5, 12)

  const handleLikeClick = () => {
    if (likeStatus.isLike) {
      deleteLikePost(post.id);
      setLikeStatus(likeStatus => {
        return {
          isLike: false,
          num_of_likes: likeStatus.num_of_likes - 1
        };
      });
    } else {
      createLikePost({ user_id: user.id, post_id: post.id });
      setLikeStatus(likeStatus => {
        return {
          isLike: true,
          num_of_likes: likeStatus.num_of_likes + 1
        };
      });
    };
  };

  useEffect(() => {
    setLikeStatus({
      ...likeStatus,
      isLike: Boolean(
        post.liking_users.find(
          liking_user => liking_user.id === user.id
        )),
      num_of_likes: post.likes.length,
    });
  }, []);

  return (
    <div className="post_card__container">
      <div className="post_card_avatar__container">
        {post.user.avatar ? <img src={post.user.avatar} /> : <Avatar />}
      </div>
      <div className="post_card_username__container">
        <div className="post_card_username__innerContainer">
          <h3 >{post.user?.username}</h3>
          <span>{formattedPostDate}</span>
        </div>
        <div className="post_card__comment_container">
          <p>{post.description}</p>
          <div>
            <span>{likeStatus.num_of_likes || null}</span>
            <ThumbUpIcon className="post_card__thumbsUpIcon"
              style={{
                color: likeStatus.isLike ? "rgb(35, 138, 248)" : "rgb(222, 220, 220)"
              }}
              onClick={handleLikeClick}

            />
            {post?.user_id === user.id && (
              <button
                className="post_card__delete_button"
                onClick={() => {
                  deletePost(post.id);
                  dispatch(updateAfteDelete(post));
                }}
              >
                <DeleteForeverIcon />
              </button>
            )}
          </div>
        </div>
      </div>
      <div>

      </div>

    </div>
  );
}

export default PostCard;
