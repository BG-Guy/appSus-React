import { noteService } from "../service/notes.service";

export const noteAppActions = {
  togglePinNote,
  addNote,
  deleteNote,
  toggleIsDone,
  addTodo,
};

function togglePinNote(note) {
  note.isPinned = !note.isPinned;
  noteService.update(note);
}

// async function setBgcColor(color, note) {
//   let bgcColor;
//   if (color === "red") bgcColor = "#E74C3C";
//   if (color === "green") bgcColor = "#52BE80";
//   if (color === "blue") bgcColor = "#5DADE2";
//   if (color === "yellow") bgcColor = "#F7DC6F";
//   if (color === "purple") bgcColor = "#A569BD";
//   if (color === "grey") bgcColor = "#D7DBDD";
//   note.bgc = bgcColor;
//   await noteService.update(note);
//   return note;
// }

function addNote(noteType, title, noteUrl, notes) {
  const newNote = noteService.createNote(noteType, title, noteUrl);
  noteService.save(newNote, notes);
}

function deleteNote(note) {
  noteService.remove(note.id);
}

function toggleIsDone(todoId, note) {
  let todoIdx = note.info.todos.findIndex((todo) => todo.todoId === todoId);
  let todo = note.info.todos[todoIdx];
  todo.isDone = !todo.isDone;
  noteService.update(note);
  return note;
}

function addTodo(todoVal, note) {
  if (!todoVal) return;
  let newTodo = noteService.createTodo(todoVal);
  note.info.todos.push(newTodo);
  noteService.update(note);
  return note;
}
