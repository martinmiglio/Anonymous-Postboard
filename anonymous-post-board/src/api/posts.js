import axios from "axios";

import { API_URL } from "./api.config.js";

export async function getLatestPosts() {
  const response = await axios.get(`${API_URL}/posts?latest=true`);
  console.log(`fetched ${response.data.length} posts to start`);
  return response.data;
}

export async function fetchMorePosts(after) {
  // fetch the next set of posts after the specified ID
  const response = await axios.get(`${API_URL}/posts?after=${after}&count=5`);
  console.log(`fetched ${response.data.length} more posts`);
  return response.data;
}
