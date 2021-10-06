import { useState}from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Dialog, DialogContent, DialogContentText,DialogActions, DialogTitle, TextField, Box} from '@mui/material'

export default function Modal(props) {
  const [task,setTask] = useState(props.todoInfo.task)
  const id = props.todoInfo.id

  const useStyles = makeStyles(() => ({flex: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }
  }))
  const classes = useStyles();

  const onChange = e => {
    setTask(e.target.value)
  }

  const onClick = e => {
    if(task === '') return
    props.changeName(id,task)
  }

  return (
    <Dialog open={props.open} onClose={props.closeHandle}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>You can edit text!</DialogContentText>
        <Box className={classes.flex}>
          <TextField
            size="small"
            onChange={onChange}
            placeholder={props.todoInfo.task}
          />
          <Button
            variant="contained"
            style={{textTransform:'none',marginLeft:10}}
            onClick={onClick}>Change
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeHandle}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
