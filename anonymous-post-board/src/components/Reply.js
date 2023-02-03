import React, { useState } from "react";

import { formatDistanceToNow } from "date-fns";

import Vote from "./Vote";

const Reply = ({ reply }) => {
  const [votes, setVotes] = useState(reply.votes);

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
        margin: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: "1" }}>
          <p>{reply.content}</p>
          <p style={{ fontSize: "10px", paddingTop: "0.2rem" }}>
            By Anonymous User
          </p>
          <p style={{ fontSize: "10px", opacity: "0.4" }}>
            {formatDistanceToNow(reply.timestamp ?? new Date(), {
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
    </div>
  );
};

export default Reply;
