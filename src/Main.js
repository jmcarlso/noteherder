import React from 'react'

import './Main.css'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import NoteForm from './NoteForm'

const Main = (props) => {
return (
    <div className="Main">
         <Sidebar 
         resetCurrentNote={props.resetCurrentNote}
         signOut={props.signOut}/>
         <NoteList notes={props.notes}
         setCurrentNote={props.setCurrentNote}/>
         <NoteForm currentNoteId={props.currentNoteId}
         saveNote={props.saveNote}
         notes={props.notes}
         removeCurrentNote={props.removeCurrentNote}/>
    </div>

)
}

export default Main