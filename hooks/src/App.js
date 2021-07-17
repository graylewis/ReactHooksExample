import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('')

  const createNote = () => {
    setNotes(oldNotes => [...oldNotes, newNote])
    setNewNote('')
  }

  const onChange = (event) => {
    setNewNote(event.target.value)
  }

  const deleteHandler = (deleteIndex) => {
    setNotes(notes.filter((val, i) => {return deleteIndex !== i}))
  }

  useEffect(function loadStoredNotes() {
    console.log(JSON.parse(localStorage.getItem('notes')))
    setNotes(JSON.parse(localStorage.getItem('notes')))
  }, [])

  useEffect(function persistForm() {
    if (notes !== []) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  });

  return (
    <div className="App">
      <div className="create-note">
        <textarea className="new-note-field" value={newNote} onChange={onChange} name="create-note-textarea"></textarea>
        <button className="create-note-button" onClick={createNote}>Save Note</button>
      </div>
      <div className="notes-container">
        { notes.map((note, i) => {
          return (
          <div key={i} className="note">
            <div key={i} className='delete'>
              <img onClick={() => deleteHandler(i)} width="16px" height="16px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAjklEQVRIie2Vyw2AIBQER3uQaIlarhwsRy+Y4AfCPuTmnEx0dwg+FH4MzIAz5FzIZlmAHfCixIXMHjqSDMAaHtyAqaD8nhnVQE4ilysSc3mJpLo8J/ms/CSeEH+7tozzK/GqpZX3FdKuInuh6Ra9vVDLYSwuT92TJSWjaJYocy5LLIdIkjT/XEPjH87PgwNng1K28QMLlAAAAABJRU5ErkJggg=="/>
            </div>
            {note}
          </div>
          )
        }) }
      </div>
    </div>
  );
}

export default App;
