import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import PostAPI from "@/api/posts";
import dynamic from "next/dynamic";

const PostList = dynamic(() => import("@/components/PostList.js"));
const Banner = dynamic(() => import("@/components/Banner.js"));
const NewPostModal = dynamic(() => import("@/components/NewPostModal.js"));
const FirstVisitModal = dynamic(() =>
  import("@/components/FirstVisitModal.js")
);
const MorePostsModal = dynamic(() => import("@/components/MorePostsModal.js"));

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostID, setNewPostID] = useState(-1);
  const [showFirstVisitModal, setShowFirstVisitModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("firstVisit") === null) {
      setShowFirstVisitModal(true);
    }
    refreshData();
  }, []);

  useEffect(() => {
    if (newPostID === -1) return;
    refreshData();
  }, [newPostID]);

  async function refreshData(callback) {
    PostAPI.getLatestPosts().then((latestPosts) => {
      setPosts(latestPosts);
      setHasMorePosts(true);
      if (callback) callback();
    });
  }

  const handleNewPost = () => {
    if (!showFirstVisitModal) {
      setShowNewPostModal(true);
    }
  };

  const handleCloseNewPostModal = () => {
    setShowNewPostModal(false);
  };

  const handleCloseFirstVisitModal = () => {
    setShowFirstVisitModal(false);
    localStorage.setItem("firstVisit", "false");
  };

  async function loadMorePosts() {
    if (posts.length === 0) return; // if there are no posts, don't try to load more posts (this will happen on the first load
    const lastPostId = posts[posts.length - 1].id; // get the ID of the last post displayed
    const nextPosts = await PostAPI.fetchMorePosts(lastPostId); // make an API request to fetch the next set of posts
    if (nextPosts.length === 0) {
      setHasMorePosts(false); // if there are no more posts, set the hasMorePosts state to false
    } else {
      setPosts([...posts, ...nextPosts]); // add the next set of posts to the existing posts array using state
    }
  }

  return (
    <div className={styles.centerpane}>
      <Banner onRefresh={refreshData} onNewPost={handleNewPost} />
      <MorePostsModal
        interval={"10000"} // ms
        posts={posts}
        onRefresh={refreshData}
      />
      <NewPostModal
        isOpen={showNewPostModal}
        onClose={handleCloseNewPostModal}
        setNewPostID={setNewPostID}
      />
      <FirstVisitModal
        isOpen={showFirstVisitModal}
        onClose={handleCloseFirstVisitModal}
      />
      <div
        className={styles.content}
        style={{
          filter: showNewPostModal || showFirstVisitModal ? "blur(5px)" : null,
        }}
      >
        <PostList
          posts={posts}
          loadMorePosts={loadMorePosts}
          hasMorePosts={hasMorePosts}
        />
      </div>
    </div>
  );
}
