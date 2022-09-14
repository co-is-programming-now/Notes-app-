const addNoteButton = document.getElementById("add-note");
const notesSection = document.getElementById("notes-section");
const notesFromDom = document.querySelectorAll(".note");
let notesFromLocal = [];
let notesToLocal = [];
//get notes from local storage
function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

notesFromLocal.push(getNotes());

notesFromLocal.forEach((note) => {});

notesToLocal.forEach(note => {
  note.id = Math.random().toString(36).substr(2, 18);
  note.content = content
})

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notesToLocal));
}

class Note {
  constructor(id, content) {
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

addNoteButton.addEventListener("click", () => {
  const newNote = new Note(2, "algo");

  newNote.createNoteElement();

  notesToLocal.push(newNote);
  saveNotes();
});








/* 
//what i was designed :(
//get from DOM
const noteAppContainer = document.getElementById("notes-app-container");
const notesSection = document.getElementById("notes-section");
const addNoteButton = document.getElementById("add-note");
const notesFromDom = document.querySelectorAll(".note");

//function get actual notes
function getNotes() {
  return JSON.parse(localStorage.getItem("ExistingNotes") || "[]");
}

//this have to save notes
function saveNotes(notes) {
  localStorage.setItem("ExistingNotes", JSON.stringify(notes));
}

function createNote() {
  const newNote = document.createElement("textarea");
  newNote.classList.add("note");

  newNote.placeholder = "click on me to write";

  notesSection.insertBefore(newNote, addNoteButton);

  //edit note
  newNote.addEventListener("change", () => {
    //function that have to update the note
    console.log("the note has changed");
  });

  newNote.addEventListener("dblclick", () => {
    newNote.remove();
    console.log("the note has deleted");
  });
}

addNoteButton.onclick = createNote; */