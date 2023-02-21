import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { getLatestPosts, fetchMorePosts } from "@/api/posts";
import dynamic from "next/dynamic";

const PostList = dynamic(() => import("@/components/PostList.js"));
const Banner = dynamic(() => import("@/components/Banner.js"));
const NewPostModal = dynamic(() => import("@/components/NewPostModal.js"));

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostID, setNewPostID] = useState(-1);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [newPostID]);

  async function fetchData() {
    const latestPosts = await getLatestPosts();
    setPosts(latestPosts);
    setHasMorePosts(true);
  }

  const handleNewPost = () => {
    setShowNewPostModal(true);
  };

  const handleCloseModal = () => {
    setShowNewPostModal(false);
  };

  async function loadMorePosts() {
    if (posts.length === 0) return; // if there are no posts, don't try to load more posts (this will happen on the first load
    const lastPostId = posts[posts.length - 1].id; // get the ID of the last post displayed
    const nextPosts = await fetchMorePosts(lastPostId); // make an API request to fetch the next set of posts
    if (nextPosts.length === 0) {
      setHasMorePosts(false); // if there are no more posts, set the hasMorePosts state to false
    } else {
      setPosts([...posts, ...nextPosts]); // add the next set of posts to the existing posts array using state
    }
  }

  return (
    <div className={styles.centerpane}>
      <Banner onRefresh={fetchData} onNewPost={handleNewPost} />
      <NewPostModal
        isOpen={showNewPostModal}
        onClose={handleCloseModal}
        setNewPostID={setNewPostID}
      />
      <div
        className={styles.content}
        style={{ filter: showNewPostModal ? "blur(5px)" : null }}
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
