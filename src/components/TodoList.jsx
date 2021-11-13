import { List } from '@mui/material'
import { Todo } from './Todo'

export const TodoList = ({ todos, removeTodo, openHandle, editStatus }) => {
  return (
    <List>
      {todos.map( todo => {
        return (
          <Todo 
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            openHandle={openHandle}
            editStatus={editStatus}
          />
        )
      })}
    </List>
  )
}
