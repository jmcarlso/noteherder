import React from 'react'

import './Main.css'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import NoteForm from './NoteForm'

const Main = (props) => {
return (
    <div className="Main">
         <Sidebar 
         resetCurrentNote={props.resetCurrentNote}/>
         <NoteList notes={props.notes}
         setCurrentNote={props.setCurrentNote}/>
         <NoteForm currentNote={props.currentNote}
         saveNote={props.saveNote}/>
    </div>

)
}

export default Main