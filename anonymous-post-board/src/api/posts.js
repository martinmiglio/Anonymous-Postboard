import axios from "axios";

import { API_URL } from "./api.config.js";

export async function getLatestPosts() {
  const response = await axios.get(`${API_URL}?latest`);
  return response.data;
}

export async function fetchMorePosts(after) {
  // fetch the next set of posts after the specified ID
  const response = await axios.get(`${API_URL}?after=${after}`);
  return response.data;
}
