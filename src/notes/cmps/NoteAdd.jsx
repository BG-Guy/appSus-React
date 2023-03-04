import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCheckCircle, faImage } from "@fortawesome/free-regular-svg-icons";
import { faAdd, faLink, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

export function NoteAdd({ addNote }) {
  const [noteType, setNoteType] = useState("noteText");
  const [noteUrl, setNoteUrl] = useState(null);
  const titleRef = useRef();
  const activeStyle = { opacity: 1 };

  const onUrlBtn = () => {
    let link;
    if (noteType === "noteVideo") {
      link = prompt("Enter Youtube URL Link");
      link = link.replace("/watch?v=", "/embed/");
    }
    if (noteType === "noteImg") {
      link = prompt("Enter Image Address");
    }
    setNoteUrl(link);
  };

  const isUrlNeeded = () => {
    if (noteType === "noteVideo" || noteType === "noteImg") return true;
    else return false;
  };

  return (
    <section className="note-add-container">
      <div className="wrapper">
        <input
          type="text"
          placeholder="Enter Note Title"
          className="note-add-input"
          ref={titleRef}
        />
        <button
          className="note-add-btn"
          onClick={() => addNote(noteType, titleRef.current.value, noteUrl)}
        >
          <FontAwesomeIcon icon={faAdd} />
        </button>
        {isUrlNeeded() && (
          <button onClick={onUrlBtn} className="url-btn">
            <FontAwesomeIcon icon={faLink} />
          </button>
        )}
      </div>
      <div className="note-types-wrapper">
        <span className="image-note">
          <FontAwesomeIcon
            onClick={() => setNoteType("noteImg")}
            style={noteType === "noteImg" && activeStyle}
            icon={faImage}
          />
        </span>
        <span className="text-note">
          <FontAwesomeIcon
            onClick={() => setNoteType("noteText")}
            style={noteType === "noteText" && activeStyle}
            icon={faSquarePen}
          />
        </span>
        <span className="video-note">
          <FontAwesomeIcon
            onClick={() => setNoteType("noteVideo")}
            style={noteType === "noteVideo" && activeStyle}
            icon={faYoutube}
          />
        </span>
        <span className="todos-note">
          <FontAwesomeIcon
            onClick={() => setNoteType("noteTodos")}
            style={noteType === "noteTodos" && activeStyle}
            icon={faCheckCircle}
          />
        </span>
      </div>
    </section>
  );
}
