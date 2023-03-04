import {
  faExpand,
  faThumbTack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { noteContext } from "./noteContext";
import { NoteImg } from "./NoteImg";
import { NoteText } from "./NoteText";
import { NoteTodos } from "./NoteTodos";
import { NoteVideo } from "./NoteVideo";
import { setBgcColor } from "../actions/note-app-actions.js";

export function NotePreview({
  note,
  // togglePinNote,
  // deleteNote,
  // setBgcColor,
  isNoteDetails,
}) {
  const { togglePinNote, deleteNote, setBgcColor, setNotes, notes } =
    useContext(noteContext);

  const cmpToRender = () => {
    if (note.type === "noteText") return <NoteText note={note} />;
    if (note.type === "noteVideo") return <NoteVideo note={note} />;
    if (note.type === "noteImg") return <NoteImg note={note} />;
    if (note.type === "noteTodos") return <NoteTodos note={note} />;
  };

  return (
    note && (
      <section className="note-preview" style={{ backgroundColor: note.bgc }}>
        {!isNoteDetails && (
          <div className="top-action-bar">
            <div className="color-swatches-wrapper">
              <span
                onClick={() => setBgcColor("red", note)}
                className="clr-btn red"
              ></span>
              <span
                onClick={() => setBgcColor("blue", note)}
                className="clr-btn blue"
              ></span>
              <span
                onClick={() => setBgcColor("green", note)}
                className="clr-btn green"
              ></span>
              <span
                onClick={() => setBgcColor("purple", note)}
                className="clr-btn purple"
              ></span>
              <span
                onClick={() => setBgcColor("yellow", note)}
                className="clr-btn yellow"
              ></span>
              <span
                onClick={() => setBgcColor("grey", note)}
                className="clr-btn grey"
              ></span>
            </div>
            <div className="btn-wrapper">
              <span className="pin-btn">
                <FontAwesomeIcon
                  onClick={() => togglePinNote(note)}
                  icon={faThumbTack}
                />
              </span>
              <span className="delete-btn">
                <FontAwesomeIcon
                  onClick={() => deleteNote(note)}
                  icon={faTrash}
                />
              </span>

              <span className="expand-btn">
                <Link to={`/note-app/${note.id}`}>
                  <FontAwesomeIcon icon={faExpand} />
                </Link>
              </span>
            </div>
          </div>
        )}
        {cmpToRender()}
      </section>
    )
  );
}
