import React from 'react'

import './Main.css'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import NoteForm from './NoteForm'
import {Route, Switch} from 'react-router-dom'

const Main = (props) => {

const formProps = {
    saveNote: props.saveNote,
    notes: props.notes,
    removeNote: props.removeNote,
    firebaseNotesSynced: props.firebaseNotesSynced

}

return (
    <div className="Main">
         <Sidebar 
              
               signOut={props.signOut}/>

         <NoteList notes={props.notes}
                    />

                    <Switch>
                        <Route path="/notes/:id"
                        render={(navProps)=> (
                            <NoteForm {...formProps}
                            {...navProps}
                        
                        />)}
                        />

                        
                    </Switch> 

         
    </div>

)
}

export default Main