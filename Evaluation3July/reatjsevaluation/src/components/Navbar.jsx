import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div style={{padding:'10px',display:'flex',gap:'10px'}}>
        <Link to='/'>Home</Link>
        <Link to='/tasks'>Tasks</Link>
        <Link to='/about'>About</Link>
    </div>
  )
}

export default Navbar