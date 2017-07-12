import React, { Component } from 'react'

import base, {auth} from './base'
import './App.css'
import Main from './Main'
import SignIn from './SignIn'
import {Route, Switch, Redirect} from 'react-router-dom'


class App extends Component {
  constructor(){
    super()
    this.state = {
      notes: [],  
     uid:null,
     firebaseNotesSynced: false,

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
      then: () => this.setState({ firebaseNotesSynced: true})
    }
  )
}


saveNote = (note) => {
  let shouldRedirect = false

  const notes = {...this.state.notes}
  if(!note.id){
    note.id = Date.now()
    shouldRedirect = true
  }
  notes[note.id] = note

  this.setState({notes})

  if(shouldRedirect)
  {
    this.props.history.push(`/notes/${note.id}`)
  }
  

}
removeNote = (note) => {
  const notes = {...this.state.notes}

   notes[note.id] = null

  this.setState({notes})
  this.props.history.push('/notes')

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



}

  signOut = () => {
    auth.signOut()
    
  }

  render() {
    const actions = {

      saveNote: this.saveNote,
      removeNote: this.removeNote,
      signOut: this.signOut,
    }

    const noteData = {
      notes: this.state.notes,
      
    }
    
    return (
      <div className="App">
        <Switch>
          <Route path="/sign-in" 
          render={() => (
            this.signedIn() 
            ? <Redirect to="/notes" />
            :<SignIn />
          )}
          
           />
          <Route 
            path="/notes" 
            render={() =>(
             this.signedIn() ?
              <Main 
              {...actions}
              {...noteData}
              firebaseNotesSynced={this.state.firebaseNotesSynced}
              />
              :<Redirect tp="/sign-in" />
            ) } />


<Route render={() => (
  this.signedIn()
  ? <Redirect to="/notes" />
  :<Redirect to="/sign-in" /> )}

  />


          </Switch>
      </div>
    )
  }
}

export default App
