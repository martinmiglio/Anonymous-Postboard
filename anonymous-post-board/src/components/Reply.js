import React, { useState } from "react";

import { formatDistanceToNow } from "date-fns";

import Vote from "./Vote";

const Reply = ({ reply }) => {
  const [votes, setVotes] = useState(reply.votes);
  const [voteStatus, setVoteStatus] = useState(
    localStorage.getItem(`p-${post.id}`)
  );

  useEffect(() => {
    // this function is called when the votes state changes
    console.log(`Updated reply ${reply.id} vote count to ${votes}`);
    // TODO: add a function to update the vote count in the database
  }, [votes]);

  useEffect(() => {
    localStorage.setItem(`r-${reply.id}`, voteStatus);
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
          status={voteStatus}
        />
      </div>
    </div>
  );
};

export default Reply;
