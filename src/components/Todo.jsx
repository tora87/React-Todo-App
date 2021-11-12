import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { ListItem, ListItemText ,Tooltip, IconButton,Checkbox, Chip} from '@mui/material'
import { Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Todo(props) {
  const [status,setStatus] = useState(props.todo.status)
  const id = props.todo.id
  const date = new Date(props.todo.created)
  const dateString = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`

  const useStyles = makeStyles((theme) => ({
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

  const doDelete = () => {
    props.removeTodo(props.todo.id)
  }

  const doEdit = () => {
    props.openHandle(props.todo)
  }

  const onChange = () => {
    setStatus(!status)
    props.editStatus(id,!status)
  }

  return (
    <>
      <ListItem className={classes.box}>
          <Checkbox checked={status} onChange={onChange}/>
          <ListItemText
            className={classes.textTask}
            style={{
              textDecoration: status ? 'line-through' : 'none',
              color: status ? 'grey' : 'inherit'
            }}>
              {props.todo.task}
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
            label={props.todo.status ? ' done ' : 'doing'}
            color={props.todo.status ? "success" : "primary"}
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
