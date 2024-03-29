import axios from "axios";

import { API_URL, REQUEST_TIMEOUT, MAX_RETRIES } from "./api.config.js";
import { handleNetworkError, handleTooManyRequests } from "./errorHandlers.js";

class RepliesAPI {
  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async getReplyById(id) {
    const response = await axios.get(`${API_URL}/replies?id=${id}`);
    return response.data;
  }

  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async getRepliesByParentId(parent_id) {
    const response = await axios.get(
      `${API_URL}/replies?parent_id=${parent_id}`
    );
    return response.data;
  }

  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async makeReply(reply) {
    const request = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${API_URL}/replies`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(reply),
    };
    const response = await axios(request);
    return response.data;
  }

  @handleTooManyRequests(REQUEST_TIMEOUT)
  @handleNetworkError(MAX_RETRIES)
  async changeReplyVotes(id, voteCount) {
    const obj = { votes: voteCount };
    const request = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${API_URL}/replies?id=${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(obj),
    };
    const response = await axios(request);
    return response.data;
  }
}

export default new RepliesAPI();
