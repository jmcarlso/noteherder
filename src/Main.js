import React from 'react'

import './Main.css'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import NoteForm from './NoteForm'

const Main = (props) => {
return (
    <div className="Main">
         <Sidebar />
         <NoteList notes={props.notes}/>
         <NoteForm />
    </div>

)
}

export default Main