import PostCard from "./PostCard";

function Posts({ posts }) {
  const renderedPosts = posts?.map((post) => {
    return <PostCard key={post.id} post={post} />;
  });

  return <div className="posts">{renderedPosts}</div>;
}

export default Posts;
