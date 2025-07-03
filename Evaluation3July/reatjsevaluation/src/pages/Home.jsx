import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div>
        <h2>Welcome to Task Track</h2>
        <Link to='/tasks'>
        <button> Go to Task Manager</button></Link>
    </div>
  )
}

export default Home