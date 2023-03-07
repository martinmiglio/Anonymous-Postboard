import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import PostsAPI from "@/api/posts.js";

const MorePostsModal = ({ interval, posts, onRefresh }) => {
  const [latestPost, setLatestPost] = useState();
  const [show, setShow] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [resetElement, setResetElement] = useState();

  // on mount, set the reset element to be the correct text for the device
  useEffect(() => {
    setResetElement(
      <div style={{ textAlign: "center", fontSize: "0.8rem" }}>
        <BrowserView>Click to refresh</BrowserView>
        <MobileView>Swipe down to refresh</MobileView>
      </div>
    );
  }, []);

  // set up the interval to check for new posts
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (show || !posts) return;
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
  }, [posts, show]);

  // if there is a new post, show the modal
  useEffect(() => {
    if (latestPost) {
      setShow(true);
    }
  }, [latestPost]);

  // if the latest post is the same as the first post, hide the modal
  useEffect(() => {
    if (!posts || !latestPost) return;
    if (posts[0].id === latestPost.id) {
      setShow(false);
    }
  }, [posts]);

  // if the modal is shown, bounce it up and down
  useEffect(() => {
    if (!show) {
      setBounce(false);
      return;
    }
    const intervalId = setInterval(() => {
      setTimeout(() => {
        setBounce(true);
        setTimeout(() => {
          setBounce(false);
        }, 500);
      }, 1000);
    }, 1500);
    return () => {
      clearInterval(intervalId);
      setBounce(false);
    };
  }, [show]);

  const handleRefresh = () => {
    setShow(false);
    onRefresh();
  };

  const modalStyle = {
    height: "50px",
    position: "fixed",
    zIndex: 9,
    top: show ? (bounce ? "67px" : "60px") : "-50px",
    left: "0",
    right: "0",
    transition: "top 0.5s ease-out",
    display: "flex",
    justifyContent: "center",
  };

  const contentStyle = {
    background: "#00cc99",
    borderRadius: "4rem",
    width: "fit-content",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem 1.5rem",
    border: "none",
    outline: "none",
    color: "white",
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
