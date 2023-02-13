import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ onRefresh, onNewPost }) => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    onRefresh().then(() => setLoading(false));
  };

  const handleNewPost = () => {
    onNewPost();
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #b3ffb3, #00cc99)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        zIndex: 1,
      }}
    >
      <h1 style={{ fontSize: "24px" }}>Anonymous Post Board</h1>
      <div style={{ width: "fit-content" }}>
        {onNewPost ? (
          <button
            id="newPostButton"
            onClick={handleNewPost}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              outline: "none",
              padding: "8px",
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} style={{ color: "white" }} />
          </button>
        ) : null}
        {onRefresh ? (
          <button
            id="refreshButton"
            onClick={handleRefresh}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              outline: "none",
              padding: "8px",
            }}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSync} style={{ color: "white" }} spin />
            ) : (
              <FontAwesomeIcon icon={faSync} style={{ color: "white" }} />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Banner;
