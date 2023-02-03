import React, { useState } from "react";

import { formatDistanceToNow } from "date-fns";

import Vote from "./Vote";
import ReplyList from "./ReplyList";

function Post({ post }) {
  const [votes, setVotes] = useState(post.votes);
  const [replies, setReplies] = useState(post.replies);

  const handleUpvote = () => {
    setVotes(votes + 1);
    // TODO: Send upvote to server
  };

  const handleDownvote = () => {
    setVotes(votes - 1);
    // TODO: Send downvote to server
  };
  return (
    <div
      style={{
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "white",
        padding: "10px",
        margin: "10px 5px 10px 5px",
        borderRadius: "10px",
        width: "calc(100vw - 20px)",
        maxWidth: "600px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: "1" }}>
          <p style={{ overflowWrap: "break-word" }}>{post.content}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: "0.5rem",
            }}
          >
            <p style={{ fontSize: "10px" }}>By Anonymous User </p>
            <p style={{ fontSize: "10px", paddingRight: "10px" }}>Reply</p>
          </div>
          <p style={{ fontSize: "10px", opacity: "0.4" }}>
            {formatDistanceToNow(post.timestamp ?? new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
        <Vote
          votes={votes}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
        />
      </div>
      <ReplyList replies={replies ?? []} />
    </div>
  );
}

export default Post;
