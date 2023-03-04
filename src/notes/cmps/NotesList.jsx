import React, { useContext } from "react";
import Masonry from "react-masonry-css";
import { NotePreview } from "./NotePreview";
import { noteContext } from "./noteContext.js";
export function NotesList({}) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const { notes, togglePinNote, deleteNote, setBgcColor, updateNotes } =
    useContext(noteContext);

  return (
    <section className="notes-list">
      <div className="pinned-notes">
        <h1 className="title">Pinned Notes</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={"my-masonry-grid"}
          columnClassName={"my-masonry-grid-column"}
        >
          {notes
            .filter((note) => {
              return note.isPinned;
            })
            .map((note) => (
              <NotePreview
                key={note.id}
                note={note}
                togglePinNote={togglePinNote}
                deleteNote={deleteNote}
                setBgcColor={setBgcColor}
              />
            ))}
        </Masonry>
      </div>
      <div className="unpinned-notes">
        <h1 className="title">Unpinned Notes</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={"my-masonry-grid"}
          columnClassName={"my-masonry-grid-column"}
        >
          {notes
            .filter((note) => {
              return !note.isPinned;
            })
            .map((note) => (
              // console.log("🚀 ~ file: NotesList.jsx:32 ~ NotesList ~ note", note);
              <NotePreview
                key={note.id}
                note={note}
                togglePinNote={togglePinNote}
                deleteNote={deleteNote}
                setBgcColor={setBgcColor}
              />
            ))}
        </Masonry>
      </div>
    </section>
  );
}
