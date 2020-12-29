import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Task_format from './Task_format'
import {Link} from 'react-router-dom'

const Tasks = (props) => {

  const {tasks, setTasks} = props

  useEffect( () => {
    axios.get('api/v1/tasks.json')
    .then(resp => setTasks(resp.data.data))
    .catch(resp => console.log(resp))
  }, [tasks.length] )

  const list = tasks.map(item => {
    return(<Task_format
      key={item.id}
      attributes={item.attributes}
      id={item.id}
      tasks={tasks}
      setTasks={setTasks}/>
    )
  })

  return(
    <div>
      <div className='Header'><h1>Task List</h1></div>
      <div><Link to={`./tasks`}><button className='big'>New Task</button></Link></div>
      <div className='List'>
        <ul>
          {list}
        </ul>
      </div>
    </div>
  )
}

export default Tasks
