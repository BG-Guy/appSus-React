import React, { useEffect, useState } from "react";
import NoteFilter from "../cmps/NoteFilter";
import { NotesList } from "../cmps/NotesList";
import { NoteAdd } from "../cmps/NoteAdd";
import { noteService } from "../service/notes.service";
import { noteContext } from "../cmps/noteContext";
export function NotesApp() {
  const [notes, setNotes] = useState(null);
  const [filterBy, setFilterBy] = useState({ noteType: "", searchVal: "" });

  useEffect(() => {
    loadNotes();
  }, [filterBy]);

  // Function that gets the notes from the local storage and update the notes state
  const loadNotes = async () => {
    console.log("🚀 ~ file: NotesApp.jsx:18 ~ loadNotes ~ filterBy:", filterBy);
    const notes = await noteService.query(filterBy).then((notes) => {
      return notes;
    });
    console.log("🚀 ~ file: NotesApp.jsx:22 ~ loadNotes ~ notes:", notes);
    setNotes(notes);
  };

  const onSetFilterBy = (filterBy) => {
    console.log(
      "🚀 ~ file: NotesApp.jsx:25 ~ onSetFilterBy ~ filterBy:",
      filterBy
    );
    setFilterBy(filterBy);
  };

  // Function that toggle the isPinned and updates both local storage and notes state
  const togglePinNote = async (note) => {
    note.isPinned = !note.isPinned;
    const updatedNotes = await noteService.update(note);
    setNotes(updatedNotes);
  };

  const setBgcColor = async (color, note) => {
    let bgcColor;
    if (color === "red") bgcColor = "#E74C3C";
    if (color === "green") bgcColor = "#52BE80";
    if (color === "blue") bgcColor = "#5DADE2";
    if (color === "yellow") bgcColor = "#F7DC6F";
    if (color === "purple") bgcColor = "#A569BD";
    if (color === "grey") bgcColor = "#D7DBDD";
    note.bgc = bgcColor;
    const updatedNotes = await noteService.update(note);
    setNotes([...updatedNotes]);
  };

  const addNote = async (noteType, title, noteUrl) => {
    const newNote = noteService.createNote(noteType, title, noteUrl);
    const updatedNotes = await noteService.save(newNote, notes);
    setNotes([...updatedNotes]);
  };

  // Function that deletes a note and update both local storage and notes state
  const deleteNote = async (note) => {
    const updatedNotes = await noteService.remove(note.id);
    setNotes(updatedNotes);
  };

  return (
    notes && (
      <div className="note-app-container">
        <noteContext.Provider
          value={{
            notes,
            setNotes,
            togglePinNote,
            deleteNote,
            setBgcColor,
            filterBy,
            onSetFilterBy,
            addNote,
          }}
        >
          <header className="note-app-header">
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <NoteAdd addNote={addNote} />
          </header>
          <div className="notes-list-container">
            <NotesList />
          </div>
        </noteContext.Provider>
      </div>
    )
  );
}
