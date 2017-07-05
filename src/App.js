import React, { Component } from 'react'

import './App.css'
import Main from './Main'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import NoteForm from './NoteForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <NoteList />
       <Main />
       <NoteForm />
      </div>
    )
  }
}

export default App
