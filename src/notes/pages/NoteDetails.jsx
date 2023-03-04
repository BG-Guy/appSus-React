import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { noteContext } from "../cmps/noteContext";
import { NoteImg } from "../cmps/NoteImg";
import { NotePreview } from "../cmps/NotePreview";
import { NoteText } from "../cmps/NoteText";
import { NoteTodos } from "../cmps/NoteTodos";
import { NoteVideo } from "../cmps/NoteVideo";
import { noteService } from "../service/notes.service";

export function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState();
  const isNoteDetails = true;
  const location = useLocation();

  // const { test } = location.testt;

  useEffect(() => {
    getNote();
    console.log(location);
  }, []);

  const onBack = () => {
    navigate(-1);
  };

  const cmpToRender = () => {
    if (note.type === "noteText") return <NoteText note={note} />;
    if (note.type === "noteVideo") return <NoteVideo note={note} />;
    if (note.type === "noteImg") return <NoteImg note={note} />;
    if (note.type === "noteTodos") return <NoteTodos note={note} />;
  };

  const getNote = async () => {
    let note = await noteService.get(id).then((note) => {
      return note;
    });
    setNote(note);
  };
  return (
    note && (
      <section className="note-details-container">
        <span className="back-btn" onClick={() => onBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <div style={{ backgroundColor: note.bgc }} className="note-preview">
          {cmpToRender()}
        </div>
      </section>
    )
  );
}
