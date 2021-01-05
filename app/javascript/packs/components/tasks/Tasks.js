import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Task_format from './Task_format'
import {Link} from 'react-router-dom'

import { SortTitle, SortPriority, SortDue } from './Sort'

const Tasks = (props) => {
  const {tasks, setTasks} = props

  useEffect( () => {
    axios.get('api/v1/tasks.json')
    .then(resp => setTasks(resp.data.data))
    .catch(resp => console.log(resp))
  }, [tasks.length] )
  console.log(tasks)
  const list = tasks.map(item => {
    return(<Task_format
      key={item.id}
      attributes={item.attributes}
      id={item.id}
      tasks={tasks}
      setTasks={setTasks}/>
    )
  })

  //for sorting
  const [sorted, setSorted] = useState(false)
  const [label, setLabel] = useState('Least')
  const [current, setCurrent] = useState('')

  const sortHandle = (e) => {

    let newTasks = tasks

    if (!sorted) {
      setLabel('asc')
      newTasks = tasks.sort((a,b)=>{
        if (a.attributes.[e] > b.attributes.[e]){return 1}
        else if (a.attributes.[e] < b.attributes.[e]){return -1}
        else {return 0}
      })
    } else {
      setLabel('desc')
      newTasks = tasks.sort((a,b)=>{
        if (a.attributes.[e] < b.attributes.[e]){return 1}
        else if (a.attributes.[e] > b.attributes.[e]){return -1}
        else {return 0}
      })
    }
    setTasks(newTasks)
    setSorted(!sorted)
    setCurrent(e)
  }

  //Specific sort for date
  const sortHandleDue = (e) => {
    let newTasks = tasks

    if (!sorted) {
      setLabel('asc')
      newTasks = tasks.sort((a,b)=>{
        if (new Date(a.attributes.due.split('-').reverse()) > new Date(b.attributes.due.split('-').reverse())) return 1
        else if (new Date(a.attributes.due.split('-').reverse()) < new Date(b.attributes.due.split('-').reverse())) return -1
        else return 0
      })
    } else {
      setLabel('desc')
      newTasks = tasks.sort((a,b)=>{
        if (new Date(a.attributes.due.split('-').reverse()) < new Date(b.attributes.due.split('-').reverse())) return 1
        else if (new Date(a.attributes.due.split('-').reverse()) > new Date(b.attributes.due.split('-').reverse())) return -1
        else return 0
      })
    }
    setTasks(newTasks)
    setSorted(!sorted)
    setCurrent(e)
  }


  return(
    <div>
      <div className='header'><h1>Task List</h1></div>
      <div className='header'><h3>{tasks.length} tasks left</h3></div>
      <div><Link to={`./tasks`}><button className='newTask'>New Task</button></Link></div>
      <div className='buttons'>
        <SortTitle current={current} setLabel={setLabel} label={label} sortHandle={sortHandle} />
        <SortPriority current={current} setLabel={setLabel} label={label} sortHandle={sortHandle} />
        <SortDue current={current} setLabel={setLabel} label={label} sortHandle={sortHandleDue} />
      </div>
      <div className='List'>
        <ul>
          {list}
        </ul>
      </div>
    </div>
  )
}

export default Tasks
