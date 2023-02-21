import axios from "axios";

import { API_URL } from "./api.config.js";

export async function getPostById(id) {
  const response = await axios.get(`${API_URL}/posts?id=${id}`);
  console.log(`fetched post ${response.data.id}`);
  return response.data;
}

export async function getLatestPosts() {
  const response = await axios.get(`${API_URL}/posts?latest=true`);
  console.log(`fetched ${response.data.length} posts to start`);
  return response.data;
}

export async function fetchMorePosts(before) {
  // fetch the next set of posts before the specified ID
  const response = await axios.get(`${API_URL}/posts?before=${before}&count=5`);
  console.log(`fetched ${response.data.length} more posts`);
  return response.data;
}

export async function makePost(post) {
  console.log(post);
  const request = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${API_URL}/posts`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(post),
  };
  console.log(request);
  const response = await axios(request);
  console.log(`posted ${response.data.id}`);
  return response.data;
}

export async function changeVotes(id, voteCount) {
  console.log(id);
  const obj = {votes: voteCount};
  const request = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `${API_URL}/posts?id=${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(obj),
  };
  console.log(request);
  const response = await axios(request);
  console.log(`posted ${response.data.id}`);
  return response.data;
}
