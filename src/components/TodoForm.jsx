import { makeStyles } from '@mui/styles'
import { useState, useRef} from 'react'
import 
{ 
  TextField,
  Button,
  Box
} from '@mui/material'

export const TodoForm = (props) =>  {

  const [text,setText] = useState('')
  const [error,setError] = useState(false)
  const inputRef = useRef(null)

  const onChange = e => {
    e.target.value === '' ?  setError(true) : setError(false)
    setText(e.target.value)
  }

  const onClick = () => {
    
    if(check()) return;

    props.addTodo(text)
    inputRef.current.value = ''
  }

  const check = () => {
    let flg = false

    if(text === ''){
      flg = true
      setError(true)
    }

    return flg
  }

  const useStyles = makeStyles(() => ({
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textField: {
      width: 400,
    }
  }))

  const classes = useStyles();

  return (
    <Box className={classes.flex}>
      <TextField
        variant="standard"
        label="What should you do?"
        helperText={error ? "Please enter something" : ""}
        className={classes.textField}
        onChange={onChange}
        error={error}
        inputRef={inputRef}
      />
      <Button
        style={{marginLeft:'20px'}}
        variant="contained"
        onClick={onClick}
      >Add Todo</Button>
    </Box>
  )
}
