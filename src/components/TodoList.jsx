import { List } from '@mui/material'
import Todo from './Todo'

export default function TodoList(props) {
  return (
    <List>
      {props.todos.map( todo => {
        return <Todo 
                  key={todo.id}
                  todo={todo}
                  removeTodo={props.removeTodo}
                  openHandle={props.openHandle}
                  editStatus={props.editStatus}/>
      })}
    </List>
  )
}
