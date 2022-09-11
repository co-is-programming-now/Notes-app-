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

addNoteButton.onclick = createNote;
