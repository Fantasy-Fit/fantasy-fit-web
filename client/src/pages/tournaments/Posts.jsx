import PostCard from "./PostCard";
import LoadingSpinner from "../auth/LoadingSpinner";
import CreateIcon from '@mui/icons-material/Create';
import InputOption from '../account/InputOption';
// import ImageIcon from '@mui/icons-material/Image';
// import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
// import EventNoteIcon from '@mui/icons-material/EventNote';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/game/feedSlice";
import { selectCurrentUser } from "../../store/auth/userSlice";
import { useAddPostMutation } from "../../store/game/feedApiSlice";
import { useGetPostsQuery } from "../../store/game/feedApiSlice";
import { usePostChatBotCommentMutation } from "../../store/openai/chatbotApiSlice";

function Posts({ posts, comp }) {
  const { refetch } = useGetPostsQuery(comp.id);
  const renderedPosts = posts?.map((post) => {
    return <PostCard key={post.id} post={post} />;
  });

  const workoutContextArray = posts?.filter(post => {
    return post.description.includes("just posted a workout");
  }).map(post => {
    return {
      "role": "user",
      "content": `On ${post.created_at.slice(0, 10)}, ${post.description.replace("just ", "")}`
    }
  });

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [addPost, { isLoading }] = useAddPostMutation();
  const [getChatBotComment, { isLoading: isChatBotLoading }] = usePostChatBotCommentMutation();

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
      post_type: data.post_type || null,
    }).unwrap();
    dispatch(setPosts([...posts, newPost]));
    setValue("description", "");
  };

  const handleChatBotClick = async (e) => {
    try {
      let request = await getChatBotComment(workoutContextArray);
      const data = {
        description: request.data.gpt_response,
        post_type: "bot"
      };
      onSubmit(data);
    } catch (error) {
      console.error(error);
    };
  };

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
          <button
            onClick={handleChatBotClick}
          >ChatBot
          </button>
        </div>
        {isChatBotLoading && <LoadingSpinner />}
        {/* <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
        </div> */}
      </div>
      {renderedPosts}
    </div>
  );
}

export default Posts;
