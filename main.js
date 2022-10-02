// get elements from DOM
const $noteAppContainer = document.querySelector("#notes-app-container");
const $notesSection = document.querySelector("#notes-section");
const $addNoteButton = document.getElementById("add-note");

//get notes from local storage
const getNotes = () => {
  return JSON.parse(localStorage.getItem("notes")) || [];
};

getNotes().forEach((note) => {
  const getBackNote = createNote(note.id, note.valueNote);
});

// listen event click on add note button
$addNoteButton.addEventListener("click", () => {
  addNote();
  console.log("note saved");
});

//save notes to local storage
const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

//create note function
function createNote(id, valueNote) {
  const $newNote = document.createElement("textarea");
  $newNote.classList.add("note");
  $newNote.value = valueNote;
  $newNote.placeholder = "click on me to write";
  $notesSection.insertBefore($newNote, $addNoteButton);

  // listen event change on note and call update note function
  $newNote.addEventListener("change", () => {
    updateNote(id, $newNote.value);
  });

  // listen event dblclick on note
  $newNote.addEventListener("dblclick", () => {
    //customize the delete note alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "rgb(46, 46, 46)",
      cancelButtonColor: "rgb(46, 46, 46)",
      confirmButtonText: "Delete it!",
      background: "rgba(103, 103, 103, 0.512)",
      position: "center",
      color: "#fff",
      width: 300,
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          width: 200,
          color: "rgba(0, 0, 0, 0.633)",
          background: "rgb(230, 230, 230);",
          showConfirmButton: false,
          position: "bottom-start",
          timer: 1500,
        });
        //remove the note from local storage and from the screen
        deleteNote(id, $newNote.element);
        $newNote.remove();
      }
    });
  });
}

//add note function
const addNote = () => {
  const existingNotes = getNotes();
  const note = {
    id: Math.floor(Math.random() * 99),
    valueNote: "",
  };
  const insertElement = createNote(note.id, note.valueNote);
  existingNotes.push(note);
  saveNotes(existingNotes);
};

//update note function

const updateNote = (id, newValueNote) => {
  const editedNote = getNotes();

  //search for the note that has changed
  const targetNote = editedNote.filter((note) => note.id === id)[0];

  targetNote.valueNote = newValueNote;
  //save updated notes on local storage
  saveNotes(editedNote);
  console.log("the note has changed");

  //customize the save note alert
  Swal.fire({
    title: "Saved!",
    background: "rgb(230, 230, 230);",
    color: "rgba(0, 0, 0, 0.633)",
    showConfirmButton: false,
    position: "bottom-start",
    width: 200,
    timer: 1500,
  });
};

//delete note function
const deleteNote = (id, element) => {
  //search for the note that has changed
  const notes = getNotes().filter((note) => note.id != id);

  //remove note deleted from local storage
  localStorage.removeItem(element);
  console.log("The note has deleted");

  //save updated notes on local storage
  saveNotes(notes);
};
