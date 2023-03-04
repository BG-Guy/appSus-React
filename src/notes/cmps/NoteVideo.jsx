import React from "react";

export function NoteVideo({ note }) {
  const getEmbedLink = () => {
    let link = note.info.url.replace("/watch?v=", "/embed/");
  };

  return (
    <div className="note-video-container">
      <h1 className="note-title">{note.title}</h1>
      <iframe className="video-container" src={note.info.url}></iframe>
    </div>
  );
}
