import React from 'react'
import {TaskProvider} from './context/TaskContext'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import About from './pages/About'
function App() {
  return (
    <div>
      <TaskProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </TaskProvider>
    </div>
  );
}

export default App