// Description: This file contains the tests for the post API

const axios = require("axios").default;
const expect = require("chai").expect;

const url = "https://api.postboard.martinmiglio.dev/posts";

describe("Post API", () => {
  let workingPostId = null;

  // create a post
  describe("Create a post", () => {
    it("should create a post", async () => {
      const body = {
        content: "This is a test post",
      };
      const response = await axios.put(url, body);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property("id");
      expect(response.data).to.have.property("content");
      expect(response.data).to.have.property("timestamp");
      expect(response.data).to.have.property("votes");
      expect(response.data.content).to.equal(body.content);
      workingPostId = response.data.id;
    });
  });

  // get a post by id
  describe("Get a post by id", () => {
    it("should get a post by id", async () => {
      const response = await axios.get(`${url}?id=${workingPostId}`);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property("id");
      expect(response.data).to.have.property("content");
      expect(response.data).to.have.property("timestamp");
      expect(response.data).to.have.property("votes");
      expect(response.data.id).to.equal(workingPostId);
    });
  });

  // update a post (change the votes and content)
  describe("Update a post", () => {
    it("should update a post", async () => {
      const body = {
        content: "This is a test post",
        votes: 1,
      };
      const response = await axios.patch(`${url}?id=${workingPostId}`, body);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property("id");
      expect(response.data).to.have.property("content");
      expect(response.data).to.have.property("timestamp");
      expect(response.data).to.have.property("votes");
      expect(response.data.id).to.equal(workingPostId);
      expect(response.data.content).to.equal(body.content);
      expect(response.data.votes).to.equal(body.votes);
    });
  });

  // delete a post
  describe("Delete a post", () => {
    it("should delete a post", async () => {
      const response = await axios.delete(`${url}?id=${workingPostId}`);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property("success");
    });
  });

  // get latest post
  describe("Get latest posts", () => {
    it("should get latest posts", async () => {
      const response = await axios.get(`${url}?latest=true`);
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an("array");
      // save the id of the first post
      workingPostId = response.data[0].id;
    });
  });

  // get all posts before a id
  describe("Get all posts before a id", () => {
    it("should get all posts before a id", async () => {
      const response = await axios.get(`${url}?before=${workingPostId}`);
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an("array");
    });
  });

  // get all posts
  describe("Get all posts", () => {
    it("should get all posts", async () => {
      const response = await axios.get(url);
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an("array");
    });
  });
});
