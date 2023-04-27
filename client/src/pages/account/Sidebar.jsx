import React from 'react'; 
// import { Avatar } from '@material-ui/core';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidedbar'>Im a sidebar
    <div className='sidebar__top'>
        <img src='' alt='' />
        {/* <Avatar className="sidebar__avatar"/> */}
        <h2>Chris Li</h2>
        <h4>chrisli@gmail.com</h4>
    </div>

    <div className="sidebar__stats">
        <div className="sidebar__stat">
            <p>Who viewed you</p>
            <p className="sidebar__statNumber">2,543</p>
        </div>
        <div className="sidebar__stat">
            <p>Views on post</p>\
            <p className='sidebar__statNumber'>2,448</p>
        </div>
        </div>

        <div className="sidebar__button">
            <p>Recent</p>
        </div>
    </div>
  )
}

export default Sidebar