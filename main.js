// get from DOM
const noteAppContainer = document.getElementById("notes-app-container");
const notesSection = document.getElementById("notes-section");
const addNoteButton = document.getElementById("add-note");

let notes = [];

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}
getNotes().forEach((note) => {
  const getBackNote = createNote(note.id, note.valueNote);
  getBackNote;
});

addNoteButton.addEventListener("click", () => {
  addNote();
  console.log("añado nota");
});

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log("la nota se guardo");
}

function createNote(id, valueNote) {
  const newNote = document.createElement("textarea");
  newNote.classList.add("note");
  newNote.value = valueNote;
  newNote.placeholder = "click on me to write";
  notesSection.insertBefore(newNote, addNoteButton);

  newNote.addEventListener("change", () => {
    updateNote(id, newNote.value);
    console.log("the note has changed");
  });

  newNote.addEventListener("dblclick", () => {
    confirm("Sure you want to delete your note?")
    if(confirm){
    // deleteNote(id, Element)
    //hacer bien cuando mi cerebro vuelva a la vida
    //la nota va a volver porq no la elimine del local storage jeje
    newNote.remove();
    }
    console.log("the note has deleted");
  });
}

function addNote() {
  const existingNotes = getNotes();
  const note = {
    id: Math.floor(Math.random() * 99),
    valueNote: "",
  };
  const insertElement = createNote(note.id, note.valueNote);
  insertElement;

  existingNotes.push(note);
  // notes.push(existingNotes)
  saveNotes(existingNotes);
}
function updateNote(id, newValueNote) {
  const notesForUpdate = getNotes();
  const targetNote = notesForUpdate.filter((note) => note.id === id)[0];

  targetNote.valueNote = newValueNote;
  saveNotes(notesForUpdate);
  console.log("yo actualizo la nota");
}

// function deleteNote(id, element){
//   const notes = getNotes().filter(note => note.id != id)
//   saveNotes(notes)
//   //lograr que se borre solito del local storage pero solo el
// }
