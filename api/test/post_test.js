// Description: This file contains the tests for the post API

const axios = require("axios").default;
const expect = require("chai").expect;

const url = "https://api.postboard.martinmiglio.dev/posts";

const timeout = 5000;

describe("Post API", () => {
  let workingPostId = null; // this is the id of the post that is created for testing purposes and is deleted at the end of the tests

  // create a post
  describe("Create a post", () => {
    it("should create a working post", (done) => {
      const body = {
        content: "This is a post for testing purposes.",
      };
      axios.put(url, body).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("id");
        expect(response.data).to.have.property("content");
        expect(response.data).to.have.property("timestamp");
        expect(response.data).to.have.property("votes");
        expect(response.data).to.have.property("ttl");
        workingPostId = response.data.id;
        console.log(`\tCreated working post: ${JSON.stringify(response.data)}`);
        done();
      });
    }).timeout(timeout);
  });

  // get a post by id
  describe("Get a post by id", () => {
    it("should get a post by id", (done) => {
      axios.get(`${url}?id=${workingPostId}`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("id");
        expect(response.data).to.have.property("content");
        expect(response.data).to.have.property("timestamp");
        expect(response.data).to.have.property("votes");
        expect(response.data).to.have.property("ttl");
        expect(response.data.id).to.equal(workingPostId);
        done();
      });
    }).timeout(timeout);
  });

  // update a post (change the votes and content)
  describe("Update a post", () => {
    it("should update a post", (done) => {
      const body = {
        content: "This is a test post after it has been updated",
        votes: 1,
      };
      axios.patch(`${url}?id=${workingPostId}`, body).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("id");
        expect(response.data).to.have.property("content");
        expect(response.data).to.have.property("timestamp");
        expect(response.data).to.have.property("votes");
        expect(response.data).to.have.property("ttl");
        expect(response.data.id).to.equal(workingPostId);
        expect(response.data.content).to.equal(body.content);
        expect(response.data.votes).to.equal(body.votes);
        console.log(`\tUpdated working post: ${JSON.stringify(response.data)}`);
        done();
      });
    }).timeout(timeout);
  });

  // get latest post
  describe("Get latest posts", () => {
    it("should get latest posts", (done) => {
      axios.get(`${url}?latest=true`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("array");
        done();
      });
    }).timeout(timeout);
  });

  // get all posts before a id
  describe("Get all posts before a id", () => {
    it("should get all posts before a id", (done) => {
      axios.get(`${url}?before=${workingPostId}`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("array");
        done();
      });
    }).timeout(timeout);
  });

  // get all posts
  describe("Get all posts", () => {
    it("should get all posts", (done) => {
      axios.get(url).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("array");
        done();
      });
    }).timeout(timeout);
  });

  // delete a post
  describe("Delete a post", () => {
    it("should delete the working post", (done) => {
      axios.delete(`${url}?id=${workingPostId}`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("success");
        expect(response.data.success).to.equal(true);
        done();
      });
    }).timeout(timeout);
  });
});
