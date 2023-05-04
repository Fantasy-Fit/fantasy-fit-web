import { useEffect } from "react";
import Posts from "./Posts";
import { useGetPostsQuery } from "../../store/game/feedApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/game/feedSlice";
import { selectFeedState } from "../../store/game/feedSlice";

function Feed({ comp }) {
  const feed = useSelector(selectFeedState);
  const { data: posts, isLoading } = useGetPostsQuery(comp.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      dispatch(setPosts([...posts]));
    }
  }, [posts]);

  return (
    <div className="feed">
      <div>
        <h2>Feed</h2>
        <Posts posts={feed} comp={comp} />
      </div>
    </div>
  );
}

export default Feed;
