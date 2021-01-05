import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Task_del from './Task_del'
import Task_edit from './Task_edit'

const Task = (props) => {
  //For list of tasks for delete button
  const {tasks, setTasks} = props

  useEffect( () => {
    axios.get('http://localhost:3000/api/v1/tasks.json')
    .then(resp => setTasks(resp.data.data))
    .catch(resp => console.log(resp))
  }, [tasks.length] )

  //For individual task
  const [task, setTask] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect( ()=> {
    const id = props.props.match.params.id
    const url = `/api/v1/tasks/${id}`

    axios.get(url)
    .then(resp => {
      setTask(resp.data)
      setLoaded(true)
    })
    .catch(resp => console.log(resp))
  }, [])

  return (
    <div className='page'>
      {loaded &&
        <Task_info
        key={task.data.id}
        attributes={task.data}
        tasks={tasks}
        setTasks={setTasks} />
      }
    </div>
  )
}

const Task_info = (props) => {

  const {title, description, due, priority} = props.attributes.attributes
  return (
    <div>
      <div className='header'><h1>Show Task Page</h1></div>
      <div className='itemForm'>
        <div className='card'>
          <div><h1>Task {props.attributes.id}: {title}</h1></div>
          <div>Description: {description}</div>
          <div>Due by: {due}</div>
          <div>Priority: {priority}</div>
        </div>
        <div className='buttons'>
          <Link to={`/`}><button>Back</button></Link>
          <Link to={`/tasks/${props.attributes.id}/edit`}><button>Edit</button></Link>
          <Link to={'/'} onClick={()=>Task_del(props.attributes.id, props.tasks, props.setTasks)}><button>Delete</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Task
