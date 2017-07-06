import React from 'react'

const Note = ({setCurrentNote, note}) => {
    const handleCLick = () =>
    {
        setCurrentNote(note)

    }
     return (
     <a onClick={handleCLick}>
              <li>
                <div className="note">
                  <div className="note-title">
                    {note.title}
                  </div>
                  <div className="note-body">
                    <p>
                        {note.body}             
                    </p>
                  </div>
                </div>
              </li>
            </a>
     )
}

export default Note