import React, {useState} from 'react'
import { Switch, Route } from 'react-router-dom'
import Tasks from './tasks/Tasks'
import Task from './task/Task'
import Task_form from './task/Task_form'
import Task_edit from './task/Task_edit'

const App = () => {
  const [tasks, setTasks] = useState([])

  return(
    <Switch>
      <Route exact path='/' render={(props)=><Tasks tasks={tasks} setTasks={setTasks}/>} />
      <Route exact path='/tasks/:id' render={(props)=><Task tasks={tasks} setTasks={setTasks} props={props}/>} />
      <Route exact path ='/tasks' component={Task_form} />
      <Route exact path='/tasks/:id/edit' component={Task_edit} />
    </Switch>
  )
}

export default App
