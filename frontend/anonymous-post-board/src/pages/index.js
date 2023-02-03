import styles from "@/styles/Home.module.css";
import PostList from "@/components/PostList.js";
import Banner from "@/components/Banner.js";

const onRefresh = () => {
  console.log("refreshing...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export default function Home() {
  const posts = [
    {
      id: 1,
      content: "This is my first post",
      votes: 10,
      replies: [
        {
          id: 1,
          content: "This is a reply to the first post",
          votes: 5,
        },
        {
          id: 2,
          content: "This is another reply to the first post",
          votes: 3,
        },
      ],
    },
    {
      id: 2,
      content:
        "This is my second post. It should be long enough to wrap to the next line. I hope it works.",
      votes: 20,
      replies: [],
    },
  ];
  return (
    <div className={styles.centerpane}>
      <Banner onRefresh={onRefresh}/>
      <div className={styles.content}>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
