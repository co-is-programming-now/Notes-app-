// get from DOM
const $noteAppContainer = document.querySelector("#notes-app-container");
const $notesSection = document.querySelector("#notes-section");
const $addNoteButton = document.getElementById("add-note");

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

getNotes().forEach((note) => {
  const getBackNote = createNote(note.id, note.valueNote);
});

$addNoteButton.addEventListener("click", () => {
  addNote();
  console.log("add note");
});

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log("note saved");
}

function createNote(id, valueNote) {
  const $newNote = document.createElement("textarea");
  $newNote.classList.add("note");
  $newNote.value = valueNote;
  $newNote.placeholder = "click on me to write";
  $notesSection.insertBefore($newNote, $addNoteButton);

  $newNote.addEventListener("change", () => {
    updateNote(id, $newNote.value);
    console.log("the note has changed");
  });

  $newNote.addEventListener("dblclick", () => {
    const plisConfirm = confirm("Sure you want to delete you note?");
    if (plisConfirm) {
      deleteNote(id, $newNote.element);
      $newNote.remove();
      console.log("The note has deleted");
    } else {
      console.log("The note has not deleted");
    }
  });
}

function addNote() {
  const existingNotes = getNotes();
  const note = {
    id: Math.floor(Math.random() * 99),
    valueNote: "",
  };
  const insertElement = createNote(note.id, note.valueNote);
  existingNotes.push(note);
  saveNotes(existingNotes);
}

function updateNote(id, newValueNote) {
  const notesForUpdate = getNotes();
  const targetNote = notesForUpdate.filter((note) => note.id === id)[0];

  targetNote.valueNote = newValueNote;
  saveNotes(notesForUpdate);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  localStorage.removeItem(element);
  saveNotes(notes);
}