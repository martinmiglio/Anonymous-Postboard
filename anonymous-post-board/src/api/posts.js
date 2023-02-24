import axios from "axios";

import { API_URL } from "./api.config.js";

export async function getPostById(id) {
  const response = await axios.get(`${API_URL}/posts?id=${id}`);
  return response.data;
}

export async function getLatestPosts() {
  const response = await axios.get(`${API_URL}/posts?latest=true`);
  return response.data;
}

export async function fetchMorePosts(before) {
  // fetch the next set of posts before the specified ID
  const response = await axios.get(`${API_URL}/posts?before=${before}&count=5`);
  return response.data;
}

export async function makePost(post) {
  const request = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${API_URL}/posts`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(post),
  };
  const response = await axios(request);
  return response.data;
}

export async function changeVotes(id, voteCount) {
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
  const response = await axios(request);
  return response.data;
}
