import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { makePost } from "@/api/posts.js";

const NewPostModal = ({ isOpen, onClose, setNewPostID }) => {
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
    makePost(post).then((post) => {
      setNewPostID(post.id);
    });
    onClose();
    setContent("");
  };

  const handleClose = () => {
    onClose();
    setContent("");
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
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
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "white",
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
    fontSize: "1em",
    opacity: content === "" ? "0.5" : "1",
    color: "white",
    padding: "5px 0 0",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    outline: "none",
  };

  const iconStyle = {
    color: "white",
    width: "24px",
    height: "24px",
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <button type="button" style={buttonStyle} onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} style={iconStyle} />
            </button>
            <button
              type="submit"
              style={buttonStyle}
              disabled={content === defaultContent}
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faPaperPlane} style={iconStyle} />
            </button>
          </div>
          <textarea
            value={content === "" && !focused ? defaultContent : content}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={textBoxStyle}
            spellCheck="true"
            rows="3"
          />
        </form>
      </div>
    )
  );
};

export default NewPostModal;
