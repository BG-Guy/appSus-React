import React, { useState } from "react";
import ComposeMailIcon from "../../SVGS/ComposeMailIcon";
import FavouriteIcon from "../../SVGS/FavouriteIcon";
import IncomingMail from "../../SVGS/IncomingMail";
import SendIcon from "../../SVGS/SendIcon";
import TrashIcon from "../../SVGS/TrashIcon";

export default function Sidebar({
  toggleCompose,
  onSetFilterBy,
  readMailsPrecentage,
}) {
  const readMailBarStyle = () => {
    return {
      width: readMailsPrecentage + "%",
    };
  };
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <div onClick={() => toggleCompose()} className="compose-email">
          <span className="compose-email-icon">
            <ComposeMailIcon />
          </span>
          <span className="title">Compose</span>
        </div>
      </div>
      <div className="sidebar-item" onClick={() => onSetFilterBy(null)}>
        <span className="incoming-mail-icon icon">
          <IncomingMail />
        </span>
        <span className="title">Inbox</span>
      </div>
      <div
        className="sidebar-item"
        onClick={() => onSetFilterBy("isFavourite")}
      >
        <span className="favourite-icon icon">
          <FavouriteIcon />
        </span>
        <span className="title">Starred</span>
      </div>
      <div className="sidebar-item" onClick={() => onSetFilterBy("isDeleted")}>
        <span className="trash-icon icon">
          <TrashIcon />
        </span>
        <span className="title">Trash</span>
      </div>
      <div className="sidebar-item" onClick={() => onSetFilterBy("isSent")}>
        <span className="sent-icon icon">
          <SendIcon />
        </span>
        <span className="title">Sent</span>
      </div>

      <div className="read-mail-bar-container">
        <p className="precentage-count">{readMailsPrecentage + "%"}</p>
        <span style={readMailBarStyle()} className="read-mail-bar"></span>
      </div>
    </div>
  );
}
