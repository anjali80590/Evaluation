import React, { createContext, useEffect, useState } from 'react'
export let TaskContext=createContext();
function TaskProvider({children}) {
  let[tasks,setTasks]=useState([]);
  useEffect(()=>{
    let fetchData=()=>{
      let initialTasks=[
        {id:1,title:'task1',description:'description 1',completed:true},
        {id:2,title:'task2',description:'description 2',completed:true}
      ]
      setTasks(initialTasks);
    }
    fetchData();
  },[])
  let addTask=(task)=>{
     setTasks(prev=>[...prev,{...task,id:Date.now(),completed:false}])
  }
  let toggleTask=(id)=>{
    setTasks(prev=>prev.map(t=>(t.id===id?{...t,completed:!t.completed}:t)))
  }
  return (
    <div>
   <TaskContext.Provider value={{tasks,addTask,toggleTask}}>
    {children}
   </TaskContext.Provider>
    </div>
  )
}

export default TaskProvider;