import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import Post from "./Post";

function PostList({ posts, loadMorePosts }) {
  console.log(posts);
  return (
    <div style={{ width: "300px" }}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMorePosts}
        hasMore={true}
        loader={
          <div style={{ textAlign: "center" }} key={0}>
            Loading ...
          </div>
        }
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PostList;
