import React, { useState } from "react";
import RepliesAPI from "@/api/replies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import Filter from "bad-words";
import Graphemer from "graphemer";

const NewReplyModal = ({
  parentPost,
  isOpen,
  onClose,
  parentReplies,
  setParentReplies,
}) => {
  const defaultContent = "What's on your mind?";
  const maxContentLength = 280;

  const filter = new Filter();

  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);
  const [postError, setPostError] = useState(false);

  const contentLenght = new Graphemer().countGraphemes(content);
  const isTooLong = contentLenght > maxContentLength;

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content === "" || isTooLong) {
      setPostError(true);
      setTimeout(() => {
        setPostError(false);
      }, 500);
      return;
    }
    const reply = {
      content: filter.clean(content),
      parent_id: parentPost.id,
      votes: 0,
      id: 0,
    };
    RepliesAPI.makeReply(reply).then(() => {
      setParentReplies([...parentReplies, reply]);
      RepliesAPI.getRepliesByParentId(parentPost.id).then((newReplies) => {
        setParentReplies(newReplies);
      });
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
    marginTop: "1rem",
    padding: "1rem",
    zIndex: 900,
    borderRadius: "16px",
    background: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "grey",
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
  };

  const contentLengthStyle = {
    color: isTooLong ? "indianred" : "white",
    opacity: String(0.5 + 0.5 * (contentLenght / maxContentLength)),
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
            rows="2"
          />
          <p style={contentLengthStyle}>
            {contentLenght}/{maxContentLength}
          </p>
        </form>
      </div>
    )
  );
};

export default NewReplyModal;
