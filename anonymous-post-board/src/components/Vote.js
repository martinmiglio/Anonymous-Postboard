import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Vote.module.css";

const Vote = ({ votes, onUpvote, onDownvote }) => (
  <div className={styles.vote}>
    <button className={styles.upvote} onClick={onUpvote}>
      <FontAwesomeIcon icon={faCaretUp} />
    </button>
    <p className={styles.votecount}>{votes}</p>
    <button className={styles.downvote} onClick={onDownvote}>
      <FontAwesomeIcon icon={faCaretDown} />
    </button>
  </div>
);

export default Vote;
