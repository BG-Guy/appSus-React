import React from "react";
import Masonry from "react-masonry-css";

export function NoteImg({ note }) {
  const breakpointColumnsObj = {
    default: 1,
  };
  return (
    <section className="note-img-container">
      <h1 className="note-title">{note.title}</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={"my-masonry-grid"}
        columnClassName={"my-masonry-grid-column"}
      >
        <div className="img-container">
          <img src={note.info.url} alt="" />
        </div>
      </Masonry>
    </section>
  );
}
