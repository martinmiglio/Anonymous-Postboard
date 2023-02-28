import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { changeVotes } from "@/api/posts.js";

import { formatDistanceToNow } from "date-fns";

const Vote = dynamic(() => import("./Vote"));
const ReplyList = dynamic(() => import("./ReplyList"));
const NewReplyModal = dynamic(() => import("./NewReplyModal"));

function Post({ post }) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [votes, setVotes] = useState(Number(post.votes));
  const [voteStatus, setVoteStatus] = useState(
    localStorage.getItem(`p-${post.id}`) || undefined
  );
  const [replies, setReplies] = useState(post.replies);
  const [showNewReplyModal, setShowNewReplyModal] = useState(false);

  const handleNewReply = () => {
    setShowNewReplyModal(true);
  };

  const handleCloseNewReplyModal = () => {
    setShowNewReplyModal(false);
  };

  useEffect(() => {
    // don't update votes on first load
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    changeVotes(post.id, votes).then((res) => {
      console.log(`Updated post ${res.id} vote count to ${res.votes} `);
    });
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
          <div>
            <p style={{ fontSize: "10px", paddingTop: "0.5rem" }}>
              By Anonymous User{" "}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "10px", opacity: "0.4" }}>
                {formatDistanceToNow(post.timestamp ?? new Date(), {
                  addSuffix: true,
                })}
              </p>
              {!showNewReplyModal && (
                <button
                  style={{
                    fontSize: "10px",
                    paddingRight: "10px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                  }}
                  onClick={handleNewReply}
                >
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
        <Vote
          votes={votes}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          status={voteStatus}
        />
      </div>
      <ReplyList replies={replies ?? []} />
      <NewReplyModal
        isOpen={showNewReplyModal}
        onClose={handleCloseNewReplyModal}
        parentPost={post}
        parentReplies={replies}
        setParentReplies={setReplies}
      />
    </div>
  );
}

export default Post;
