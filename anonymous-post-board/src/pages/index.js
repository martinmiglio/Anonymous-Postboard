import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import PostList from "@/components/PostList.js";
import Banner from "@/components/Banner.js";
import getPosts from "./api/get_posts";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const onRefresh = async () => {
    console.log("refreshing...");
    // get the latest posts
    const posts = await getPosts();
    setPosts(posts);
  };

  const onNewPost = () => {
    console.log("new post");
    // forwards to the new post page
    location.href = "new_post";
  };

  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <div className={styles.centerpane}>
      <Banner onRefresh={onRefresh} onNewPost={onNewPost} />
      <div className={styles.content}>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
