import React, { useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './Task_style.css'

const Task_form = (props) => {
  //For priority button
  const priorityVal = [1,2,3,4,5].map ( (priority) => {
    return(
      <div className='radioItem' key={priority}>
        <input type='radio' value={priority} name='priority'
          id={priority} onChange={() => setPriority(priority)}/>
        <div>{priority}</div>
      </div>
      )
    }
  )

  //Seperate function to set Priority cuz buttons/radio involved
  //prolly cuz 'e(event)' from text and 'priority(score)' from button is different
  const setPriority = (priority) => {
    setTask({...task, priority})
  }

  const [task, setTask] = useState({title:'', description:'', due:'', priority:undefined})

  const handleChange = (e) => {
    e.preventDefault()
    setTask({...task, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {

    //csrf token to protect app from performing unwanted requests
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('/api/v1/tasks', {task})
    .then(resp => {
      setTask({title:'', description:'', due:'', priority:undefined})
      window.location.href = 'http://localhost:3000'
    })
    .catch(resp => console.log(task))
    //Redirect back to Index Page. Remember to import {withRouter} from r-r-d
  }

  return(
    <div>
      <h1>New Task Page</h1>
      <form onSubmit={handleSubmit}>
        <div className='item'>
          <div>Task: </div>
          <input type='text' style={{width:'100%'}}
            onChange={handleChange} value={task.title} name='title' />

          <div>Description: </div>
          <textarea style={{width:'100%', height:'300px'}}
            onChange={handleChange} value={task.description} name='description' />

          <div>Due Date: </div>
          <input type='text' style={{width:'80px'}}
            onChange={handleChange} value ={task.due} name='due' placeholder='dd-mm-yyyy' />

          <div>Priority: </div>
          <div className='priorityBox'>{priorityVal}</div>
          <div>
            <button type='submit' onSubmit={handleSubmit}>Create Task</button>
            <Link to={'/'}><button>Back</button></Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Task_form
