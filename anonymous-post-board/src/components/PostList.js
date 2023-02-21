import React from "react";
import dynamic from "next/dynamic";

const InfiniteScroll = dynamic(() => import("react-infinite-scroller"));
const Post = dynamic(() => import("./Post"));

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
