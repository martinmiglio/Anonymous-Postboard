import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { makePost } from "@/api/posts.js";

const NewPostModal = ({ isOpen, onClose }) => {
  const defaultContent = "What's on your mind?";

  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content === "") {
      return;
    }
    const post = { content: content };
    makePost(post);
    onClose(); // close the modal after the post is created
    setContent("");
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    outline: "none",
    padding: "8px",
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
    padding: "1rem",
    zIndex: 1000,
    borderRadius: "16px",
    background: "black",
  };

  const textBoxStyle = {
    outline: "none",
    userSelect: "text",
    cursor: "text",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    lineHeight: "24px",
    backgroundColor: "transparent",
    border: "none",
    opacity: content === "" ? "0.5" : "1",
  };

  const show = isOpen ? true : false;
  return (
    show && (
      // style the modal to be centered on the page, overtop the rest of the content
      <div style={modalStyle}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <label>
            <input
              type="text"
              value={content === "" && !focused ? defaultContent : content}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={textBoxStyle}
              spellCheck="true"
            />
          </label>
          <div style={{ marginLeft: "auto", marginRight: 0 }}>
            <button type="button" style={buttonStyle} onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} style={{ color: "white" }} />
            </button>
            <button
              type="submit"
              style={buttonStyle}
              disabled={content === defaultContent}
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faPaperPlane} style={{ color: "white" }} />
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default NewPostModal;
