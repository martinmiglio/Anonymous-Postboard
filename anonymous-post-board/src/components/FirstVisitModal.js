import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const FirstVisitModal = ({ isOpen, onClose }) => {
  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100% - 2rem)",
    maxWidth: "calc(600px - 2rem)",
    padding: "1rem",
    zIndex: 1000,
    borderRadius: "16px",
    background: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "white",
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
      <div style={modalStyle}>
        <div
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
            <h3>Welcome to Anonymous Post Board!</h3>
            <button type="button" style={buttonStyle} onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} style={iconStyle} />
            </button>
          </div>

          <p
            style={{
              fontSize: "1rem",
              color: "white",
              marginTop: "1rem",
            }}
          >
            This is a place where you can post anonymously. You can post
            anything you want, as long as it's respectful and not illegal.
          </p>
        </div>
      </div>
    )
  );
};

export default FirstVisitModal;
