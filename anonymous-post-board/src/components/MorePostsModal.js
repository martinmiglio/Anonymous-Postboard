import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import PostsAPI from "@/api/posts.js";

const MorePostsModal = ({ interval, posts, onRefresh }) => {
  const [latestPost, setLatestPost] = useState();
  const [show, setShow] = useState(false);
  const [resetElement, setResetElement] = useState();

  // on mount, set the reset element to be the correct text for the device
  useEffect(() => {
    setResetElement(
      <p style={{ textAlign: "center", fontSize: "0.8rem" }}>
        <BrowserView>Click to refresh</BrowserView>
        <MobileView>Swipe down to refresh</MobileView>
      </p>
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!posts) return;
      PostsAPI.getLatestPosts().then((latestPosts) => {
        if (latestPosts.length === 0) return;
        if (latestPost && latestPosts[0].id === latestPost.id) {
          // already updated on this post, hide the modal
          setShow(false);
        } else if (latestPosts[0].id !== posts[0].id) {
          setLatestPost(latestPosts[0]);
        }
      });
    }, interval);
    return () => clearInterval(intervalId);
  }, [posts]);

  useEffect(() => {
    if (latestPost) {
      setShow(true);
    }
  }, [latestPost]);

  const handleRefresh = () => {
    setShow(false);
    onRefresh();
  };

  const modalStyle = {
    width: "100%",
    position: "fixed",
    zIndex: 9,
    top: show ? "60px" : "-100%",
    left: "0",
    right: "0",
    transition: "top 0.5s ease-out",
    transform: "translateY(0)",
    display: "flex",
    justifyContent: "center",
  };

  const contentStyle = {
    background: "linear-gradient(to bottom, #b3ffb3, #00cc99)",
    borderRadius: "4rem",
    width: "fit-content",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem 1.5rem",
    border: "none",
    outline: "none",
  };

  return (
    <div style={modalStyle}>
      <button style={contentStyle} onClick={handleRefresh}>
        <h3 style={{ textAlign: "center", fontSize: "1rem" }}>
          There are new posts!
        </h3>
        {resetElement}
      </button>
    </div>
  );
};

export default MorePostsModal;
