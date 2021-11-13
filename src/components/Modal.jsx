import { useState}from 'react'
import { makeStyles } from '@mui/styles'
import 
{
  Button,
  Dialog, 
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  TextField, Box
} from '@mui/material'

export const Modal = ({ openHandle, closeHandle, changeName, open, todoInfo}) => {
  const [task,setTask] = useState(todoInfo.task)
  const id = todoInfo.id
  const [error,setError] = useState(false)

  const onChange = e => {
    e.target.value === '' ? setError(true) : setError(false)
    setTask(e.target.value)
  }

  const onClick = e => {
    if(task === '') return
    changeName(id,task)
  }

  const useStyles = makeStyles(() => ({
    flex: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }

  }))

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={closeHandle}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>You can edit text!</DialogContentText>
        <Box className={classes.flex}>
          <TextField
            size="small"
            onChange={onChange}
            defaultValue={todoInfo.task}
            placeholder={todoInfo.task}
            error={error}
            helperText={error ? "Please enter something" : ""}
          />
          <Button
            variant="contained"
            style={{textTransform:'none',marginLeft:10}}
            onClick={onClick}>Change
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandle}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
