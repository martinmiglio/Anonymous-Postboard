// Description: This file contains the tests for the post API

const axios = require("axios").default;
const expect = require("chai").expect;

const url = "https://api.postboard.martinmiglio.dev";

const timeout = 5000;

describe("Reply API", () => {
  let workingParentPostId = null; // this is the id of the post that is created for testing purposes and is deleted at the end of the tests
  let workingReplyId = null; // same as above but for replies

  // create a parent post
  describe("Create a parent post", () => {
    it("should create a working parent post", (done) => {
      const body = {
        content: "This is a parent post for testing purposes.",
      };
      axios.put(`${url}/posts`, body).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("id");
        expect(response.data).to.have.property("content");
        expect(response.data).to.have.property("timestamp");
        expect(response.data).to.have.property("votes");
        expect(response.data).to.have.property("ttl");
        workingParentPostId = response.data.id;
        console.log(`\tCreated working post: ${JSON.stringify(response.data)}`);
        done();
      });
    }).timeout(timeout);
  });

  // create a reply
  describe("Create a reply", () => {
    it("should create a working reply", (done) => {
      const body = {
        content: "This is a reply for testing purposes.",
        parent_id: workingParentPostId,
      };
      axios.put(`${url}/replies`, body).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("id");
        expect(response.data).to.have.property("content");
        expect(response.data).to.have.property("timestamp");
        expect(response.data).to.have.property("votes");
        expect(response.data).to.have.property("ttl");
        expect(response.data).to.have.property("parent_id");
        workingReplyId = response.data.id;
        console.log(
          `\tCreated working reply: ${JSON.stringify(response.data)}`
        );
        done();
      });
    }).timeout(timeout);
  });

  // get a reply by id
  describe("Get a reply by id", () => {
    it("should get a reply by id", (done) => {
      axios.get(`${url}/replies?id=${workingReplyId}`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("id");
        expect(response.data).to.have.property("content");
        expect(response.data).to.have.property("timestamp");
        expect(response.data).to.have.property("votes");
        expect(response.data).to.have.property("ttl");
        expect(response.data).to.have.property("parent_id");
        expect(response.data.id).to.equal(workingReplyId);
        done();
      });
    }).timeout(timeout);
  });

  // get all replies by parent id
  describe("Get all replies by parent id", () => {
    it("should get all replies by parent id", (done) => {
      axios
        .get(`${url}/replies?parent_id=${workingParentPostId}`)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data).to.be.an("array");
          expect(response.data.length).to.be.greaterThan(0);
          done();
        });
    }).timeout(timeout);
  });

  // delete a reply
  describe("Delete a reply", () => {
    it("should delete a reply", (done) => {
      axios.delete(`${url}/replies?id=${workingReplyId}`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("success");
        expect(response.data.success).to.equal(true);
        done();
      });
    }).timeout(timeout);
  });

  // delete a parent post
  describe("Delete the parent post", () => {
    it("should delete the parent post", (done) => {
      axios.delete(`${url}/posts?id=${workingPostId}`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("success");
        expect(response.data.success).to.equal(true);
        done();
      });
    }).timeout(timeout);
  });
});
