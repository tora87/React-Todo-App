import { useState}from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Dialog, DialogContent, DialogContentText,DialogActions, DialogTitle, TextField, Box} from '@mui/material'

export default function Modal(props) {
  const [task,setTask] = useState(props.todoInfo.task)
  const id = props.todoInfo.id
  const [error,setError] = useState(false)

  const useStyles = makeStyles(() => ({flex: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }
  }))
  const classes = useStyles();

  const onChange = e => {
    e.target.value === '' ? setError(true) : setError(false)
    setTask(e.target.value)
  }

  const onClick = e => {
    if(task === '') return
    props.changeName(id,task)
  }

  // const check = () => {
  //   let flg = false

  //   if(task === ''){
  //     flg = true
  //     setError(true)
  //   }

  //   return flg
  // }

  return (
    <Dialog open={props.open} onClose={props.closeHandle}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>You can edit text!</DialogContentText>
        <Box className={classes.flex}>
          <TextField
            size="small"
            onChange={onChange}
            defaultValue={props.todoInfo.task}
            placeholder={props.todoInfo.task}
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
        <Button onClick={props.closeHandle}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
