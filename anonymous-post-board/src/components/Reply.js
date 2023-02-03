import React, { useState } from "react";
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
        padding: "10px",
        margin: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: "1" }}>
          <p>{reply.content}</p>
          <p style={{ fontSize: "10px" }}>By Anonymous User</p>
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
