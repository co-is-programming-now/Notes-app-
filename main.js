// get elements from DOM
const $noteAppContainer = document.querySelector("#notes-app-container");
const $notesSection = document.querySelector("#notes-section");
const $addNoteButton = document.getElementById("add-note");

//API to consume grammar corrector typewise
const url = "https://typewise-ai.p.rapidapi.com/correction/whole_sentence";

//request to send the text and get the answer
const correctOne = async (text) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "4fd22ea8fdmsh468888a68e87134p1e7f0bjsnc376e8fe3ff3",
      "X-RapidAPI-Host": "typewise-ai.p.rapidapi.com",
    },
    body: `{"text": "${text}","keyboard":"QWERTY","languages":["en"]}`,
  };

  const corrected = await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      const { corrected_text } = response;
      return corrected_text;
    })
    .catch((err) => console.error(err));

  return corrected;
};

//get notes from local storage
const getNotes = () => {
   return JSON.parse(localStorage.getItem("notes")) || [];
};

//instructions for new users
if (getNotes().length === 0) {
  setTimeout(() => {
    Swal.fire({
      title: "Welcome to a brief tutorial!",
      text: "Click on the button + to add a new note, click on the note to type, double click to delete. You can also write without worrying about your grammar.",
      confirmButtonText: "I understand!",
      confirmButtonColor: "rgba(0, 0, 0, 0.633)",
      background: "rgb(230, 230, 230)",
      position: "center",
      color: "rgba(0, 0, 0, 0.633)",
      width: 400,
    });
  }, 2000);
}

getNotes().forEach((note) => {
  const getBackNote = createNote(note.id, note.valueNote);
});

// listen event click on add note button
$addNoteButton.addEventListener("click", () => {
  addNote();
});

const updateValue = (text, target) => {
  target.innerHTML = text;
};

//save notes to local storage
const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

//create note function
function createNote(id, valueNote) {
  const $newNote = document.createElement("textarea");
  $newNote.setAttribute("id", id);
  $newNote.classList.add("note");
  $newNote.value = valueNote;
  $newNote.placeholder = "click on me to write";
  $notesSection.insertBefore($newNote, $addNoteButton);

  // listen event change on note and call update note function
  $newNote.addEventListener("change", async (e) => {
    await updateNote(id, $newNote.value);
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
const updateNote = async (id, newValueNote) => {
  const notaParaModificar = document.getElementById(`${id}`);
  const editedNote = getNotes();
  //search for the note that has changed
  const targetNote = editedNote.filter((note) => note.id === id)[0];
  const nuevoValor = await correctOne(newValueNote);
  targetNote.valueNote = await nuevoValor;
  notaParaModificar.value = nuevoValor;

  saveNotes(editedNote);

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

  //save updated notes on local storage
  saveNotes(notes);
};