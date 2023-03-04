import React from "react";
import dynamic from "next/dynamic";
const Reply = dynamic(() => import("./Reply.js"));

const ReplyList = ({ replies }) => (
  <div
    style={{
      borderLeftStyle: "solid",
      borderLeftWidth: "1px",
      borderLeftColor: "hsl(0, 0%, 40%)",
    }}
  >
    {replies.map((reply) => (
      <Reply key={reply.id} reply={reply} />
    ))}
  </div>
);

export default ReplyList;
