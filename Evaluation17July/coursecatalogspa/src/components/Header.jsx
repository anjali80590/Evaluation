import { Link } from 'react-router-dom'
import React, { useState } from 'react'

function Header({toggleTheme,theme}) {
  return (
    <div  className='flex justify-between p-10 ' >
      <div className='flex gap-30'>
        {" "}
        <Link to="/">Home</Link>
        <Link to="/fav">Favourite</Link>
      </div>
      <button onClick={toggleTheme}>{theme==='white'?"light":'dark'}</button>
    </div>
  );
}

export default Header