import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Vote({ votes, onUpvote, onDownvote, status }) {
  const animationDuration = 200;

  const [upvoteAnimation, setUpvoteAnimation] = useState(false);
  const [downvoteAnimation, setDownvoteAnimation] = useState(false);

  const handleUpvote = () => {
    setUpvoteAnimation(true);
    onUpvote();
  };

  const handleDownvote = () => {
    setDownvoteAnimation(true);
    onDownvote();
  };

  useEffect(() => {
    if (upvoteAnimation) {
      setTimeout(() => {
        setUpvoteAnimation(false);
      }, animationDuration);
    }
  }, [upvoteAnimation]);

  useEffect(() => {
    if (downvoteAnimation) {
      setTimeout(() => {
        setDownvoteAnimation(false);
      }, animationDuration);
    }
  }, [downvoteAnimation]);

  const iconStyles = {
    height: "1.5rem",
    width: "1.5rem",
    "--fa-animation-iteration-count": "1",
    "--fa-animation-duration": `${animationDuration}ms`,
  };

  const buttonStyles = {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    width: "1.5rem",
    background: "none",
    outline: "none",
    padding: "0 5px 0 5px",
    display: "flex",
    alignItems: "center",
  };

  const upvoteStyle = {
    color: "greenyellow",
    opacity: status === "upvoted" ? "1.0" : "0.4",
    ...buttonStyles,
  };

  const downvoteStyle = {
    color: "red",
    opacity: status === "downvoted" ? "1.0" : "0.4",
    ...buttonStyles,
  };

  const voteCountStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div>
      <button
        aria-label="upvote post"
        onClick={handleUpvote}
        style={upvoteStyle}
      >
        <FontAwesomeIcon
          icon={faCaretUp}
          style={iconStyles}
          beat={upvoteAnimation}
        />
      </button>
      <p style={voteCountStyle}>{votes}</p>
      <button
        aria-label="downvote post"
        onClick={handleDownvote}
        style={downvoteStyle}
      >
        <FontAwesomeIcon
          icon={faCaretDown}
          style={iconStyles}
          beat={downvoteAnimation}
        />
      </button>
    </div>
  );
}

export default Vote;
