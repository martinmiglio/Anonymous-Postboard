import React, { useState, useEffect } from "react";

import { formatDistanceToNow } from "date-fns";

import Vote from "./Vote";
import ReplyList from "./ReplyList";

function Post({ post }) {
  const [votes, setVotes] = useState(Number(post.votes));
  const [replies, setReplies] = useState(post.replies);
  const [voteStatus, setVoteStatus] = useState(
    localStorage.getItem(`p-${post.id}`) || undefined
  );

  useEffect(() => {
    // this function is called when the votes state changes
    console.log(`Updated post ${post.id} vote count to ${votes}`);
    // TODO: add a function to update the vote count in the database
  }, [votes]);

  useEffect(() => {
    // if status is undefined, remove the item from localStorage
    if (voteStatus === undefined) {
      localStorage.removeItem(`p-${post.id}`);
    } else {
      localStorage.setItem(`p-${post.id}`, voteStatus);
    }
  }, [voteStatus]);

  const handleUpvote = () => {
    if (voteStatus === "upvoted") {
      setVoteStatus(undefined);
      setVotes(votes - 1);
    } else if (voteStatus === "downvoted") {
      setVoteStatus("upvoted");
      setVotes(votes + 2);
    } else {
      setVoteStatus("upvoted");
      setVotes(votes + 1);
    }
  };

  const handleDownvote = () => {
    if (voteStatus === "downvoted") {
      setVoteStatus(undefined);
      setVotes(votes + 1);
    } else if (voteStatus === "upvoted") {
      setVoteStatus("downvoted");
      setVotes(votes - 2);
    } else {
      setVoteStatus("downvoted");
      setVotes(votes - 1);
    }
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
          status={voteStatus}
        />
      </div>
      <ReplyList replies={replies ?? []} />
    </div>
  );
}

export default Post;
