import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import Post from "./Post";

function PostList({ posts, loadMorePosts, hasMorePosts }) {
  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMorePosts}
        hasMore={hasMorePosts}
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
