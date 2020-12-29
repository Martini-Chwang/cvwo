import React, {useState} from 'react'
import axios from 'axios'

const Task_del = (task_id, tasks, setTasks) => {

  const url = `/api/v1/tasks/${task_id}`
  axios.delete(url)
    .then(resp => {
      const newTasks= tasks.filter(item=>item.id!==task_id)
      setTasks(newTasks)
      //window.location.reload()
    })
    .catch(resp=> console.log(resp))
}

export default Task_del
