import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import PostAPI from "@/api/posts.js";
import Filter from "bad-words";
import Graphemer from "graphemer";

const NewPostModal = ({ isOpen, onClose, setNewPostID }) => {
  const defaultContent = "What's on your mind?";
  const maxContentLength = 280;

  const animationDuration = 200;

  const filter = new Filter();

  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [focused, setFocused] = useState(false);
  const [postError, setPostError] = useState(false);
  const [sentPostAnimation, setSentPostAnimation] = useState(false);
  const [colsedAnimation, setClosedAnimation] = useState(false);

  useEffect(() => {
    if (sentPostAnimation) {
      setTimeout(() => {
        setSentPostAnimation(false);
      }, animationDuration);
    }
    if (colsedAnimation) {
      setTimeout(() => {
        setClosedAnimation(false);
      }, animationDuration);
    }
  }, [sentPostAnimation, colsedAnimation]);

  useEffect(() => {
    setContentLength(new Graphemer().countGraphemes(content));
  }, [content]);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content === "" || contentLength > maxContentLength) {
      setPostError(true);
      setTimeout(() => {
        setPostError(false);
      }, 500);
      return;
    }
    setSentPostAnimation(true);
    const post = { content: filter.clean(content) };
    PostAPI.makePost(post).then((post) => {
      setNewPostID(post.id);
    });
    onClose();
    setContent("");
  };

  const handleClose = () => {
    setClosedAnimation(true);
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
    maxWidth: "580px",
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
    overflow: "hidden",
    lineHeight: "24px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1em",
    opacity: content === "" ? "0.5" : "1",
    color: "white",
    padding: "5px 0 0",
    resize: "none",
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
    "--fa-beat-scale": "0.9",
    "--fa-animation-duration": `${animationDuration}ms`,
  };

  const contentLengthStyle = {
    color: contentLength > maxContentLength ? "indianred" : "white",
    opacity: String(0.5 + 0.5 * (contentLength / maxContentLength)),
    fontSize: "0.8em",
    textAlign: "right",
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
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={iconStyle}
                shake={postError}
              />
            </button>
          </div>
          <textarea
            autoFocus
            value={content === "" && !focused ? defaultContent : content}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={textBoxStyle}
            spellCheck="true"
            rows="3"
          />
          <p style={contentLengthStyle}>
            {contentLength}/{maxContentLength}
          </p>
        </form>
      </div>
    )
  );
};

export default NewPostModal;
