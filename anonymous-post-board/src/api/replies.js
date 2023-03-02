import axios from "axios";

import { API_URL } from "./api.config.js";

export async function getReplyById(id) {
  const response = await axios.get(`${API_URL}/replies?id=${id}`);
  return response.data;
}

export async function getRepliesByParentId(parent_id) {
  const response = await axios.get(`${API_URL}/replies?parent_id=${parent_id}`);
  return response.data;
}

export async function makeReply(reply) {
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

export async function changeReplyVotes(id, voteCount) {
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
