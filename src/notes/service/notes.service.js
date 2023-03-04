import { utilService } from "../../services/util.service.js";
import { storageService } from "../../services/storage.service.js";

const NOTES_KEY = "notesDB";
_createNotes();

export const noteService = {
  query,
  get,
  remove,
  save,
  update,
  createNote,
  toggleIsDone,
  createTodo,
  addTodo,
};

async function query(filterBy) {
  const { searchVal, noteType } = filterBy;
  console.log("🚀 ~ file: notes.service.js:21 ~ query ~ searchVal:", searchVal);
  const notesFromQuery = await storageService.query(NOTES_KEY).then((notes) => {
    return notes;
  });
  let filteredNotes = [...notesFromQuery];
  if (searchVal)
    filteredNotes = filteredNotes.filter((note) => {
      console.log(
        "🚀 ~ file: notes.service.js:29 ~ filteredNotes=filteredNotes.filter ~ note.title:",
        note.title
      );
      return note.title.toLowerCase().includes(searchVal.toLowerCase());
    });
  if (noteType)
    filteredNotes = filteredNotes.filter((note) => {
      return note.type === noteType;
    });

  console.log(
    "🚀 ~ file: notes.service.js:31 ~ query ~ filteredNotes:",
    filteredNotes
  );
  return filteredNotes;
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

function save(note, notes) {
  return storageService.post(NOTES_KEY, note, notes);
}

function update(note) {
  return storageService.update(NOTES_KEY, note);
}

function getNoteInfo(noteType, noteUrl) {
  let info;
  if (noteType === "noteTodos")
    return (info = {
      todos: [
        {
          txt: "USB flashdrive",
          isDone: false,
          color: "#f0f8ff",
          importance: 4,
        },
      ],
    });
  if (noteType === "noteImg")
    return (info = {
      url: noteUrl,
    });
  if (noteType === "noteVideo")
    return (info = {
      url: noteUrl,
    });
  if (noteType === "noteText")
    return (info = {
      txt: "",
    });
}

function createNote(noteType, title, noteUrl) {
  return {
    type: noteType,
    bgc: "#f0f8ff",
    isPinned: false,
    info: getNoteInfo(noteType, noteUrl),
    title: title,
  };
}

function createTodo(todoText) {
  return {
    txt: todoText,
    isDone: false,
    todoId: utilService.makeId(),
    color: "#f0f8ff",
  };
}

function addTodo(todoText, note) {
  if (!todoText) return;
  note.info.todos.push(todoText);
  update(note);
}

function toggleIsDone(todoId, note) {
  let todoIdx = note.info.todos.findIndex((todo) => todo.todoId === todoId);
  let todo = note.info.todos[todoIdx];
  todo.isDone = !todo.isDone;
  update(note);
  return note;
}

function _createNotes() {
  var notes = utilService.loadFromStorage(NOTES_KEY);

  if (!notes || notes.length < 1) {
    notes = [
      {
        id: utilService.makeId(),
        type: "noteTodos",
        title: "Get my stuff from work",
        bgc: "#f0f8ff",
        isPinned: false,
        info: {
          label: "Enter A Todo",
          todos: [
            {
              txt: "USB flashdrive",
              isDone: false,
              todoId: utilService.makeId(),
              color: "#f0f8ff",
            },
            {
              txt: "Drving Liscence",
              isDone: false,
              todoId: utilService.makeId(),
              color: "#f0f8ff",
            },
          ],
        },
      },

      {
        id: utilService.makeId(),
        type: "noteText",
        title: "Funny joke",
        bgc: "#f0f8ff",
        isPinned: false,
        info: {
          txt: "Fullstack Me Baby!",
        },
      },

      {
        id: utilService.makeId(),
        type: "noteTodos",
        title: "My Shopping list",
        bgc: "#f0f8ff",
        isPinned: false,
        info: {
          todos: [
            {
              txt: "Flafel",
              isDone: false,
              todoId: utilService.makeId(),
              color: "#f0f8ff",
            },
            {
              txt: "Hummus",
              isDone: false,
              todoId: utilService.makeId(),
              color: "#f0f8ff",
            },
            {
              txt: "Milk",
              isDone: false,
              todoId: utilService.makeId(),
              color: "#f0f8ff",
            },
          ],
        },
      },

      {
        id: utilService.makeId(),
        type: "noteImg",
        title: "Bobi and Me",
        bgc: "#f0f8ff",
        isPinned: false,
        info: {
          url: "https://lumiere-a.akamaihd.net/v1/images/character_themuppets_kermit_b77a431b.jpeg",
        },
      },

      {
        id: utilService.makeId(),
        type: "noteVideo",
        title: "Awesome Jam",

        bgc: "#f0f8ff",
        isPinned: true,
        info: {
          url: "https://www.youtube.com/embed/CJbR7K0E2Z4",
        },
      },

      {
        id: utilService.makeId(),
        type: "noteTodos",
        title: "Wish List",
        bgc: "#f0f8ff",
        isPinned: false,
        info: {
          todos: [
            {
              txt: "A Pet Tiger",
              isDone: false,
              todoId: utilService.makeId(),
              color: "#f0f8ff",
            },
            {
              txt: "A Pet Lion",
              isDone: false,
              todoId: utilService.makeId(),
              color: "#f0f8ff",
            },
          ],
        },
      },
    ];

    utilService.saveToStorage(NOTES_KEY, notes);
  }

  return notes;
}
