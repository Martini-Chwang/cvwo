import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Task_edit = (props) => {

  //For individual task
  const [task, setTask] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect( ()=> {
    const id = props.match.params.id
    const url = `/api/v1/tasks/${id}`

    axios.get(url)
    .then(resp => {
      setTask(resp.data.data.attributes)
      setLoaded(true)
    })
    .catch(resp => console.log(resp))
  }, [])

  //Task form setup
  const priorityVal = [1,2,3,4,5].map ( (priority) => {
    return(
      <div className='radioItem' key={priority}>
        <input type='radio' value={task.priority} name='priority'
          id={priority} onChange={() => setPriority(priority)}/>
        <div>{priority}</div>
      </div>
      )
    }
  )
  //Seperate function to set Priority cuz buttons/radio involved
  //prolly cuz 'e(event)' from text and 'priority(score)' from button is different
  const setPriority = (priority) => {
    setTask({...task, 'priority': priority})
  }

  const handleChange = (e) => {
    console.log(task)
    e.preventDefault()
    setTask({...task, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    //csrf token to protect app from performing unwanted requests
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    console.log(task)
    debugger
    const id = props.match.params.id
    const url = `/api/v1/tasks/${id}`
    axios.put(url, {task})
    .then(resp => {
      setTask({title:'', description:'', due:'', priority:undefined})
      window.location.href = 'http://localhost:3000'

    })
    .catch(resp => console.log(task))
    //Redirect back to Index Page. Remember to import {withRouter} from r-r-d
  }

  return(<div>
    {loaded &&
      <div>
        <h1>Edit Task Page</h1>
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
              onChange={handleChange} value ={task.due} name='dueDate' placeholder='dd-mm-yyyy' />
            <div>Priority: </div>
            <div className='priorityBox'>{priorityVal}</div>
            <div>
              <button type='submit' onSubmit={handleSubmit}>Save Changes</button>
              <Link to={'/'}><button>Back</button></Link>
            </div>
          </div>
        </form>
      </div>
    }</div>
  )
}

export default Task_edit
