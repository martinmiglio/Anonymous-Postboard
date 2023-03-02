import axios from "axios";

import { API_URL, REQUEST_TIMEOUT, MAX_RETRIES } from "./api.config.js";
import { handleNetworkError, handleTooManyRequests } from "./errorHandlers.js";

class PostsAPI {
  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async getPostById(id) {
    const response = await axios.get(`${API_URL}/posts?id=${id}`);
    return response.data;
  }

  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async getLatestPosts() {
    const response = await axios.get(`${API_URL}/posts?latest=true`);
    return response.data;
  }

  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async fetchMorePosts(before) {
    // fetch the next set of posts before the specified ID
    const response = await axios.get(
      `${API_URL}/posts?before=${before}&count=5`
    );
    return response.data;
  }

  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async makePost(post) {
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

  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async changePostsVotes(id, voteCount) {
    const obj = { votes: voteCount };
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
}

export default new PostsAPI();
