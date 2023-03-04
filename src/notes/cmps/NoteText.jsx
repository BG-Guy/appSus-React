import React from "react";

export function NoteText({ note }) {
  return (
    <div className="note-text-container dynamic-note-container">
      <h1 className="note-title">{note.title}</h1>
      <p>{note.info.txt}</p>
    </div>
  );
}
