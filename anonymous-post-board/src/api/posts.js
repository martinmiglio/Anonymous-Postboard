import axios from "axios";

import { API_URL } from "./api.config.js";

class PostsAPI {
  constructor() {
    this.MAX_RETRIES = 5;
    this.REQUEST_TIMEOUT = 1000;
  }

  @handleTooManyRequests(this.REQUEST_TIMEOUT)
  @handleNetworkError(this.MAX_RETRIES)
  async getPostById(id) {
    const response = await axios.get(`${API_URL}/posts?id=${id}`);
    return response.data;
  }

  @handleTooManyRequests(this.REQUEST_TIMEOUT)
  @handleNetworkError(this.MAX_RETRIES)
  async getLatestPosts() {
    const response = await axios.get(`${API_URL}/posts?latest=true`);
    return response.data;
  }

  @handleTooManyRequests(this.REQUEST_TIMEOUT)
  @handleNetworkError(this.MAX_RETRIES)
  async fetchMorePosts(before) {
    // fetch the next set of posts before the specified ID
    const response = await axios.get(
      `${API_URL}/posts?before=${before}&count=this.MAX_RETRIES`
    );
    return response.data;
  }

  @handleTooManyRequests(this.REQUEST_TIMEOUT)
  @handleNetworkError(this.MAX_RETRIES)
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

  @handleTooManyRequests(this.REQUEST_TIMEOUT)
  @handleNetworkError(this.MAX_RETRIES)
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
