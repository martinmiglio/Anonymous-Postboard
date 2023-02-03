import React from "react";
import Reply from "./Reply";

const ReplyList = ({ replies }) => (
  <div style={{
    borderLeftStyle: "solid",
  }}>
    {replies.map((reply) => (
      <Reply key={reply.id} reply={reply} />
    ))}
  </div>
);

export default ReplyList;
