import React from 'react'

import './Main.css'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import NoteForm from './NoteForm'

const Main = () => {
return (
<div className="Main">
         <Sidebar />
         <NoteList />
         <NoteForm />
    </div>

)
}

export default Main