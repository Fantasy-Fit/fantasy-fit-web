import PostCard from "./PostCard";
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("description")} />
        <button type="submit">Post</button>
      </form>
      {renderedPosts}
    </div>
  );
}

export default Posts;
