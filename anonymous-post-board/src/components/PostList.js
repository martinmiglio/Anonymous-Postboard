import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import Post from "./Post";

function PostList({ posts, loadMorePosts }) {
  console.log(posts);
  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMorePosts}
        hasMore={true}
        loader={
          <div style={{ textAlign: "center" }} key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PostList;
