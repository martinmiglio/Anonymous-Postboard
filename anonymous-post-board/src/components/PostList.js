import React from "react";
import Post from "./Post";

function PostList({ posts }) {
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
