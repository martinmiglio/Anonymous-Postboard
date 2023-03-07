import React from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

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
          <div
            style={{
              padding: "25px",
              width: "calc(100vw - 20px)",
              maxWidth: "600px",
              textAlign: "center",
            }}
            key={0}
          >
            <FontAwesomeIcon
              style={{ height: "50px" }}
              icon={faCircleNotch}
              spin
            />
          </div>
        }
      >
        {posts.map((post) => (
          <Post
            key={Buffer.from(JSON.stringify(post)).toString("base64")}
            post={post}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PostList;
