import PostCard from "./PostCard";
import CreateIcon from '@mui/icons-material/Create';
import InputOption from '../account/InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
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
  const renderedPosts = posts?.map((post) => {
    return <PostCard key={post.id} post={post} />;
  });

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [addPost, { isLoading }] = useAddPostMutation();

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

  return (
    <div className="posts">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <InputOption Icon={CreateIcon} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("description")}
              autoComplete="off" />
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
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
        </div>
      </div>
      {renderedPosts}
    </div>
  );
}

export default Posts;
