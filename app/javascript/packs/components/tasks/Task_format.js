import React from 'react'
import './Tasks_style.css'

import {Link} from 'react-router-dom'

import Task_del from '../task/Task_del'

const Task_format = (props) => {
  return (
    <div className='item'>
      <div><h4>Task {props.id}: {props.attributes.title}</h4></div> <hr/>
      <div>Description: {props.attributes.description}</div>
      <div>Due by: {props.attributes.due}</div>
      <div>Priority: {props.attributes.priority}</div>
      <Link to={`/tasks/${props.id}`}>
        <button type='button'>Show</button>
      </Link>
      <button>Edit</button>
      <button onClick={()=>Task_del(props.id, props.tasks, props.setTasks)}>Delete</button>
    </div>
  )
}

export default Task_format
