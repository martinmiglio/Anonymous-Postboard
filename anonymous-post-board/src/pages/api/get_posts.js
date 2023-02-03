// an aysnc function to act as a fake backend
const getPosts = async () => {
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

  const N = 10;
  for (let i = 0; i < N; i++) {
    if (Math.random() < 0.5) {
      posts.push({
        id: i + 3,
        content: "This is post " + (i + 4),
        votes: i - N / 2,
        replies: [],
      });
    } else {
      const lastPost = posts[posts.length - 1];
      lastPost.replies.push({
        id: i + 3,
        content: "This is post " + (i + 4) + ", but as a reply",
        votes: i - N / 2,
      });
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(posts), 1000);
  });
};

export default getPosts;
