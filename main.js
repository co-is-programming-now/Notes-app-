const addNoteButton = document.getElementById("add-note");
const notesSection = document.getElementById("notes-section");
const notesFromDom = document.querySelectorAll(".note");

//get notes from local storage
function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}
let notesFromLocal = [];
notesFromLocal.push(getNotes());

notesFromLocal.forEach((note) => {
  
});

let notes = [];
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

class Note {
  constructor(id, content){
    this.id = id;
    this.content = content;
  }
  createNoteElement() {
    const noteElement = document.createElement("textarea");
    noteElement.classList.add("note");
    noteElement.placeholder = "empty note";
    notesSection.insertBefore(noteElement, addNoteButton);
    console.log("work");
  }
}


//suuestamente esto guardaria las notas cuando refresque la pagina pero es un engaño


// get from DOM
// const noteAppContainer = document.getElementById("notes-app-container");
// const notesSection = document.getElementById("notes-section");
// const addNoteButton = document.getElementById("add-note");
// const notesFromDom = document.querySelectorAll(".note");

// function get actual notes
// function getNotes() {
//   return JSON.parse(localStorage.getItem("notes")) || [];
// }
// let notesFromLocal = [];
// notesFromLocal.push(getNotes());

// save notes on local storage
// let notes = [];
// function saveNotes() {
//   localStorage.setItem("notes", JSON.stringify(notes));
// }

// function createNote() {
//   const newNote = document.createElement("textarea");
//   newNote.classList.add("note");
//   newNote.placeholder = "click on me to write";
//   newNote.value = "";
//   newNote.id = Math.random().toString(36).substr(2, 18);
//   notesSection.insertBefore(newNote, addNoteButton);
//   console.log("work");
//   notes.push(newNote);
// }
// Math.random().toString(36).substr(2, 18);