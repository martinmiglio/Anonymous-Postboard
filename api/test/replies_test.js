// Description: This file contains the tests for the post API

const axios = require("axios").default;
const expect = require("chai").expect;

const url = "https://api.postboard.martinmiglio.dev/replies";

describe("Reply API", () => {
  describe("No tests yet", () => {
    it("should be true", () => {
      expect(true).to.equal(true);
    });
  });

  // THIS CODE SHOULD BE UNCOMMENTED WHEN THE REPLY API IS READY
  //
  //   let workingPostId = null;
  //   let workingReplyId = null;
  //   // create a post for testing
  //   describe("Create a post for testing", () => {
  //     it("should create a post for testing", async () => {
  //       const body = {
  //         content: "This is a test post",
  //       };
  //       const response = await axios.put(
  //         "https://api.postboard.martinmiglio.dev/posts",
  //         body
  //       );
  //       expect(response.status).to.equal(200);
  //       expect(response.data).to.have.property("id");
  //       expect(response.data).to.have.property("content");
  //       expect(response.data).to.have.property("timestamp");
  //       expect(response.data).to.have.property("votes");
  //       expect(response.data.content).to.equal(body.content);
  //       workingPostId = response.data.id;
  //     });
  //   });
  //
  //   // create a reply
  //   describe("Create a reply", () => {
  //     it("should create a reply", async () => {
  //       const body = {
  //         content: "This is a test reply",
  //         parent_id: workingPostId,
  //       };
  //       const response = await axios.put(url, body);
  //       expect(response.status).to.equal(200);
  //       expect(response.data).to.have.property("id");
  //       expect(response.data).to.have.property("parent_id");
  //       expect(response.data).to.have.property("content");
  //       expect(response.data).to.have.property("timestamp");
  //       expect(response.data).to.have.property("votes");
  //       expect(response.data.content).to.equal(body.content);
  //       workingReplyId = response.data.id;
  //     });
  //   });
  //
  //   // get a reply by id
  //   describe("Get a reply by id", () => {
  //     it("should get a reply by id", async () => {
  //       const response = await axios.get(`${url}?id=${workingReplyId}`);
  //       expect(response.status).to.equal(200);
  //       expect(response.data).to.have.property("id");
  //       expect(response.data).to.have.property("parent_id");
  //       expect(response.data).to.have.property("content");
  //       expect(response.data).to.have.property("timestamp");
  //       expect(response.data).to.have.property("votes");
  //       expect(response.data.id).to.equal(workingReplyId);
  //     });
  //   });
  //
  //   // get all replies for a post
  //   describe("Get all replies for a post", () => {
  //     it("should get all replies for a post", async () => {
  //       const response = await axios.get(`${url}?parent_id=${workingPostId}`);
  //       expect(response.status).to.equal(200);
  //       expect(response.data).to.be.an("array");
  //       expect(response.data[0]).to.have.property("id");
  //       expect(response.data[0]).to.have.property("parent_id");
  //       expect(response.data[0]).to.have.property("content");
  //       expect(response.data[0]).to.have.property("timestamp");
  //       expect(response.data[0]).to.have.property("votes");
  //       expect(response.data[0].parent_id).to.equal(workingPostId);
  //     });
  //   });
  //
  //   // update a reply
  //   describe("Update a reply", () => {
  //     it("should update a reply", async () => {
  //       const body = {
  //         content: "This is an updated test reply",
  //         votes: 1,
  //       };
  //       const response = await axios.patch(`${url}?id=${workingReplyId}`, body);
  //       expect(response.status).to.equal(200);
  //       expect(response.data).to.have.property("id");
  //       expect(response.data).to.have.property("parent_id");
  //       expect(response.data).to.have.property("content");
  //       expect(response.data).to.have.property("timestamp");
  //       expect(response.data).to.have.property("votes");
  //       expect(response.data.id).to.equal(workingReplyId);
  //       expect(response.data.content).to.equal(body.content);
  //     });
  //   });
  //
  //   // delete a reply
  //   describe("Delete a reply", () => {
  //     it("should delete a reply", async () => {
  //       const response = await axios.delete(`${url}?id=${workingReplyId}`);
  //       expect(response.status).to.equal(200);
  //       expect(response.status).to.equal(200);
  //       expect(response.data).to.have.property("success");
  //     });
  //   });
});
