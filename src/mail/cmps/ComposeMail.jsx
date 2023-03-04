import React from "react";
import TrashIcon from "../../SVGS/TrashIcon";
import SendIcon from "../../SVGS/SendIcon";
import { useState } from "react";
import { useRef } from "react";

export default function ComposeMail({ onSendMail, toggleCompose }) {
  const [isFullscreen, useFullscreen] = useState(false);
  const UseFullscreen = () => {
    useFullscreen(!isFullscreen);
  };
  const subjectVal = useRef(null);
  const bodyVal = useRef(null);
  const toVal = useRef(null);

  const createMailInfo = () => {
    return {
      subject: subjectVal.current.value,
      body: bodyVal.current.value,
      to: toVal.current.value,
    };
  };

  return (
    <div
      className={
        isFullscreen
          ? "compose-email-container fullscreen"
          : "compose-email-container"
      }
    >
      <div className="compose-email">
        <div className="compose-email-header">
          <h4>New Message</h4>
          <span
            onClick={() => UseFullscreen()}
            className="fullscreen-btn"
          ></span>
          <span onClick={() => toggleCompose()} className="close-btn"></span>
        </div>
        <div className="inputfield-container">
          <input
            ref={toVal}
            placeholder="To Cc"
            type="text"
            className="email-to"
          />
          <input
            ref={subjectVal}
            placeholder="subject"
            type="text"
            className="subject"
          />
        </div>
        <div className="mail-content-wrapper">
          <textarea ref={bodyVal} className="mail-content" />
        </div>
        <span
          onClick={() => onSendMail(createMailInfo())}
          className="send-wrapper"
        >
          <SendIcon />
        </span>
      </div>
    </div>
  );
}
