import axios from "axios";

import { API_URL } from "./api.config.js";
import { handleTooManyRequests, handleNetworkError } from "./errorHandlers.js";

class PostsAPI {
  @handleTooManyRequests(1000)
  @handleNetworkError(5)
  async getPostById(id) {
    const response = await axios.get(`${API_URL}/posts?id=${id}`);
    return response.data;
  }

  @handleTooManyRequests(1000)
  @handleNetworkError(5)
  async getLatestPosts() {
    const response = await axios.get(`${API_URL}/posts?latest=true`);
    return response.data;
  }

  @handleTooManyRequests(1000)
  @handleNetworkError(5)
  async fetchMorePosts(before) {
    const response = await axios.get(
      `${API_URL}/posts?before=${before}&count=5`
    );
    return response.data;
  }

  @handleTooManyRequests(1000)
  @handleNetworkError(5)
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

  @handleTooManyRequests(1000)
  @handleNetworkError(5)
  async changeVotes(id, voteCount) {
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
