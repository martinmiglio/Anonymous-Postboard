import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import PostList from "@/components/PostList.js";
import Banner from "@/components/Banner.js";
import { getLatestPosts, fetchMorePosts } from "@/api/posts.js";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const latestPosts = await getLatestPosts();
    setPosts(latestPosts);
  }

  const onNewPost = () => {
    console.log("new post");
    // forwards to the new post page
    location.href = "new_post";
  };

  async function loadMorePosts() {
    if(posts.length === 0) return; // if there are no posts, don't try to load more posts (this will happen on the first load
    const lastPostId = posts[posts.length - 1].id; // get the ID of the last post displayed
    const nextPosts = await fetchMorePosts(lastPostId); // make an API request to fetch the next set of posts
    setPosts([...posts, ...nextPosts]); // add the next set of posts to the existing posts array using state
  }

  return (
    <div className={styles.centerpane}>
      <Banner onRefresh={fetchData} onNewPost={onNewPost} />
      <div className={styles.content}>
        <PostList posts={posts} loadMorePosts={loadMorePosts} />
      </div>
    </div>
  );
}
