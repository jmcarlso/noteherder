import React, { Component } from 'react'

import base, {auth} from './base'
import './App.css'
import Main from './Main'
import SignIn from './SignIn'


class App extends Component {
  constructor(){
    super()

    this.setCurrentNote = this.setCurrentNote.bind(this)
    this.state = {
      notes: [],  
      currentNoteId: null


  }
}
componentWillMount = () => {
  this.getUserFromLocalStorage()
  auth.onAuthStateChanged(
    (user) => {
      if (user) {
          this.handleAuth(user)
      }
      else{
         this.handleUnauth()
      }
    }
  )
}
getUserFromLocalStorage = () => {
  const uid = localStorage.getItem('uid')
  if(!uid) return
  this.setState({uid})
}

syncNotes =() => {
 this.bindingRef = base.syncState(
    `notes/${this.state.uid}`,
    {
      context: this,
      state: 'notes',
    }
  )
}



  setCurrentNote(note){
    this.setState({currentNoteId: note.id})
  }
resetCurrentNote =() => {
  this.setCurrentNote({id: null})
}
saveNote = (note) => {
  const notes = {...this.state.notes}
  if(!note.id){
    note.id = Date.now()
  }
  notes[note.id] = note

  this.setState({notes})
  this.setCurrentNote(note)

}
removeCurrentNote = () => {
  const notes = {...this.state.notes}

   notes[this.state.currentNoteId] = null

  this.setState({notes})
  this.resetCurrentNote()

}

signedIn = () => {
  return this.state.uid
}


  handleAuth = (user) => {
    localStorage.setItem('uid', user.uid)
    this.setState(
      {uid: user.uid },
      this.syncNotes
      )
  }

handleUnauth = () => {
localStorage.removeItem('uid')

  if(this.bindingRef){
  base.removeBinding(this.bindingRef)
}

this.setState({
  uid: null,
  notes :{},
})

this.resetCurrentNote()

}

  signOut = () => {
    auth.signOut()
    
  }

  render() {
    const actions = {
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      saveNote: this.saveNote,
      removeCurrentNote: this.removeCurrentNote,
      signOut: this.signOut,
    }

    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote,
    }
    
    return (
      <div className="App">
        {this.signedIn() ? 
       <Main
        notes={this.state.notes} 
       currentNoteId={this.state.currentNoteId}
      {...actions}
      />
       : <SignIn handleAuth ={this.handleAuth}/>}
      </div>
    )
  }
}

export default App
