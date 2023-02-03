import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    onRefresh().then(() => setLoading(false));
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "darkgray",
        padding: "10px",
        width: "100%",
      }}
    >
      <h1>Anonymous Post Board</h1>
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
          <FontAwesomeIcon icon={faSync} spin />
        ) : (
          <FontAwesomeIcon icon={faSync} />
        )}
      </button>
    </div>
  );
};

export default Banner;
