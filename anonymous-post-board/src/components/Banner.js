import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ onRefresh, onNewPost }) => {
  const animationDuration = 200;

  const [loading, setLoading] = useState(false);
  const [newPostAnimation, setNewPostAnimation] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (newPostAnimation) {
      setTimeout(() => {
        setNewPostAnimation(false);
      }, animationDuration);
    }
  }, [newPostAnimation]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const handleRefresh = () => {
    setLoading(true);
    onRefresh(() => setLoading(false));
  };

  const handleNewPost = () => {
    setNewPostAnimation(true);
    onNewPost();
  };

  const iconStyle = {
    color: "white",
    width: "24px",
    height: "24px",
  };

  const bannerStyle = {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "50px",
    zIndex: 500,
    overflow: "hidden",
    backdropFilter: "blur(5px)",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    height: "100%",
    padding: "0 1rem",
  };

  const MAX_SCROLL_POSITION = 75;

  const calculateOpacity = (scrollPosition) => {
    const opacity = 25 / Math.max(scrollPosition, 1);
    const gradientOpacity = Math.max(
      0,
      1 - scrollPosition / MAX_SCROLL_POSITION
    );
    return opacity * gradientOpacity;
  };

  const backgroundStyle = {
    background: "linear-gradient(to bottom, #b3ffb3, #00cc99)",
    height: "50px",
    position: "absolute",
    opacity: calculateOpacity(scrollPosition),
    // add a transition to the opacity
    transition: "opacity 0.2s ease-out",
    left: 0,
    width: "100%",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
    padding: "8px",
  };

  return (
    <div style={bannerStyle}>
      <div style={backgroundStyle} />
      <div style={contentStyle}>
        <h1>Anonymous Post Board</h1>
        <div style={{ width: "fit-content" }}>
          {onRefresh ? (
            <button
              aria-label="refresh"
              onClick={handleRefresh}
              style={buttonStyle}
            >
              <FontAwesomeIcon icon={faSync} style={iconStyle} spin={loading} />
            </button>
          ) : null}
          {onNewPost ? (
            <button
              aria-label="new post"
              onClick={handleNewPost}
              style={buttonStyle}
            >
              <FontAwesomeIcon
                icon={faCommentDots}
                style={{
                  ...iconStyle,
                  "--fa-beat-scale": "0.9",
                  "--fa-animation-duration": `${animationDuration}ms`,
                }}
                beat={newPostAnimation}
              />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Banner;
