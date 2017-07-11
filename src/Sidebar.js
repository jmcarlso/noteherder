import React from 'react'

import './Sidebar.css'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
const Sidebar = (props) => {
return( 
        <nav className="Sidebar">
          <div className="logo">
            <img src={quill} alt="Noteherder" />
          </div>
          
          <a className="new-note" href="/notes">
            <img src={newHover} alt="New note" />
            <img className="outline" src={newIcon} alt="New note"  
            onClick={() => props.resetCurrentNote}/>
          </a>

          <div className="SignOut">
            <button onClick={props.signOut}>
              <i className="fa fa-sign-out"></i>
            </button>
          </div>
        </nav>
        )
}
export default Sidebar