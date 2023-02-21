import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Vote.module.css";

const Vote = ({ votes, onUpvote, onDownvote, status }) => (
  <div className={styles.vote}>
    <button
      className={styles.upvote}
      onClick={onUpvote}
      style={{
        opacity: status === "upvoted" ? "1.0" : "0.6",
      }}
    >
      <FontAwesomeIcon icon={faCaretUp} />
    </button>
    <p className={styles.votecount}>{votes}</p>
    <button
      className={styles.downvote}
      onClick={onDownvote}
      style={{
        opacity: status === "downvoted" ? "1.0" : "0.6",
      }}
    >
      <FontAwesomeIcon icon={faCaretDown} />
    </button>
  </div>
);

export default Vote;
