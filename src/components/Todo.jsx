import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 
{ 
  ListItem, 
  ListItemText,
  Tooltip,
  IconButton,
  Checkbox,
  Chip,
  Divider
} from '@mui/material'

export const Todo = ({ todo, removeTodo, openHandle, editStatus}) => {
  const [status,setStatus] = useState(todo.status)
  const id = todo.id
  const date = new Date(todo.created)
  const dateString = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`

  const doDelete = () => {
    removeTodo(todo.id)
  }

  const doEdit = () => {
    openHandle(todo)
  }

  const onChange = () => {
    setStatus(!status)
    editStatus(id,!status)
  }

  const useStyles = makeStyles(() => ({
    box: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    textTask: {
      width:200,
      fontSize: 18,
      letterSpacing:2
    },
    textCreated: {
      fontSize: 18,
      letterSpacing:2,
      textAlign: 'center'
    },
    deleteBtn: {
      '&:hover':{
        color: '#ab003c'
      }
    },
    editBtn: {
      '&:hover':{
        color: '#357a38'
      }
    }
  }))

  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.box}>
          <Checkbox checked={status} onChange={onChange} />
          <ListItemText
            className={classes.textTask}
            style={{
              textDecoration: status ? 'line-through' : 'none',
              color: status ? 'grey' : 'inherit'
            }}>
              {todo.task}
          </ListItemText>
          <ListItemText
            className={classes.textCreated}
            style={{
              textDecoration: status ? 'line-through' : 'none',
              color: status ? 'grey' : 'inherit'
            }}>
              {dateString}
          </ListItemText>
          <Chip 
            label={todo.status ? ' done ' : 'doing'}
            color={todo.status ? "success" : "primary"}
            variant="outlined" 
            style={{marginLeft:10}}
          />
          <Tooltip
            arrow
            title={status ? "":"Edit"}
            placement="top"
            className={classes.editBtn}
          >
              <IconButton 
                onClick={doEdit}
                disabled={status} 
                style={{marginLeft:15}}
              >
                <EditIcon />
              </IconButton>
          </Tooltip>
          <Tooltip
            arrow
            title="Delete"  
            placement="top"
            className={classes.deleteBtn}
          >
            <IconButton
              onClick={doDelete} 
              style={{marginLeft:10}}
            >
            <DeleteIcon />
            </IconButton>
          </Tooltip>
      </ListItem>
      <Divider/>
    </>
  )
}
