import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { formatDistanceToNow } from "date-fns";
import RepliesAPI from "@/api/replies.js";
const Vote = dynamic(() => import("./Vote"));

const Reply = ({ reply }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [votes, setVotes] = useState(Number(reply.votes));
  const [voteStatus, setVoteStatus] = useState(
    localStorage.getItem(`r-${reply.id}`)
  );

  useEffect(() => {
    // don't update votes on first load
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    RepliesAPI.changeReplyVotes(reply.id, votes).then((res) => {
      console.log(`Updated reply ${reply.id} vote count to ${votes}`);
    });
  }, [votes, reply.id]);

  useEffect(() => {
    if (voteStatus === undefined) {
      localStorage.removeItem(`r-${reply.id}`);
    } else {
      localStorage.setItem(`r-${reply.id}`, voteStatus);
    }
  }, [voteStatus, reply.id]);

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
