import PostCard from "./PostCard";
import CreateIcon from '@mui/icons-material/Create';
import InputOption from '../account/InputOption';
import PostPageNums from "./PostPageNums";
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/game/feedSlice";
import { selectCurrentUser } from "../../store/auth/userSlice";

import { useAddPostMutation } from "../../store/game/feedApiSlice";
import { useGetPostsQuery } from "../../store/game/feedApiSlice";

function Posts({ posts, comp }) {
  const { refetch } = useGetPostsQuery(comp.id);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [addPost, { isLoading }] = useAddPostMutation();
  const NUM_OF_POSTS_PER_PAGE = 5;
  const [pageNum, setPageNum] = useState(0);

  const schema = yup.object().shape({
    description: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const newPost = await addPost({
      description: data.description,
      competition_id: comp.id,
    }).unwrap();
    dispatch(setPosts([...posts, newPost]));
    setValue("description", "");
  };

  const renderedPosts = posts?.slice(pageNum * NUM_OF_POSTS_PER_PAGE, (pageNum + 1) * NUM_OF_POSTS_PER_PAGE).map((post) => {
    return <PostCard key={post.id} post={post} />;
  });

  const numOfPages = Math.ceil(posts?.length / NUM_OF_POSTS_PER_PAGE);

  return (
    <div className="posts">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <InputOption Icon={CreateIcon} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("description")}
              placeholder="Write a comment..."
              autoComplete="off"
            />
            {/* <textarea
              {...register("description")}
              placeholder="Write a comment..."
              wrap="hard"
            >
            </textarea> */}
            <button>
              <InputOption
                Icon={InsertCommentIcon}
                title="Post"
                type="submit"
                color="rgb(233, 33, 112)"
              />
            </button>
          </form>
        </div>
        {/* <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
        </div> */}
      </div>
      {renderedPosts}
      {posts.length > 0 && <PostPageNums numOfPages={numOfPages} pageNum={pageNum} setPageNum={setPageNum} />}
    </div>
  );
}

export default Posts;
