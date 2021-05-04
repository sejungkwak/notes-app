const addBtn = document.getElementById('addBtn');
const mainArea = document.getElementById('main');

document.addEventListener('DOMContentLoaded', getNotes);
addBtn.addEventListener('click', addNote);
mainArea.addEventListener('click', editOrDelete);

function addNote() {
  const form = document.createElement('form');
  form.classList.add('note');
  form.innerHTML = `
    <label class="control-bar">
      <i class="far fa-edit editBtn"></i>
      <i class="far fa-trash-alt deleteBtn"></i>
    </label>
    <textarea class="textarea"></textarea>
  `
  mainArea.appendChild(form);

  setTimeout(() => {
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
      note.addEventListener('change', saveLocalNotes);
    })
  },0)
}

function editOrDelete(e) {
  const item = e.target;

  if ( item.classList[2] === 'editBtn' ) {
    const note = item.parentElement.nextElementSibling;
    note.toggleAttribute('readOnly');
  }

  if ( item.classList[2] === 'deleteBtn' ) {
    const note = item.parentElement.parentElement;
    note.remove();
    removeLocalNote(note);
  }
}

function saveLocalNotes(note) {
  let notes;
  if ( localStorage.getItem('notes') === null ) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  notes.push(note.target.value);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function removeLocalNote(note) {
  let notes;
  if ( localStorage.getItem('notes') === null ) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  const noteIndex = note.children[1].innerText;
  notes.splice(notes.indexOf(noteIndex), 1);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
  let notes;
  if ( localStorage.getItem('notes') === null ) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  notes.forEach(note => {
    const form = document.createElement('form');
    form.classList.add('note');
    form.innerHTML = `
      <label class="control-bar">
        <i class="far fa-edit editBtn"></i>
        <i class="far fa-trash-alt deleteBtn"></i>
      </label>
      <textarea class="textarea">${note}</textarea>
    `
    mainArea.appendChild(form);
  })

  setTimeout(() => {
    const textareas = document.querySelectorAll('.textarea');
    textareas.forEach(textarea => {
      textarea.addEventListener('input', saveLocalNotes);
    })
  },0)
}