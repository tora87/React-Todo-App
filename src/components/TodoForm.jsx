import { makeStyles } from '@mui/styles'
import { TextField,Button,Box} from '@mui/material'
import { useState } from 'react'

export default function TodoForm(props) {

  const useStyles = makeStyles((theme) => ({
    flex: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    textField: {
      width: 400
    },
    button: {
      marginLeft: 20
    }
  }))
  const classes = useStyles();

  const [text,setText] = useState('')
  const [error,setError] = useState(false)

  const onChange = e => {
    e.target.value === '' ?  setError(true) : setError(false)
    setText(e.target.value)
  }

  const onClick = () => {
    
    if(check()) return;

    props.addTodo(text)
  }

  const check = () => {
    let flg = false

    if(text === ''){
      flg = true
      setError(true)
    }

    return flg
  }

  return (
    <Box className={classes.flex}>
      <TextField
        variant="standard"
        label="What should you do?"
        helperText={error ? "Please enter something" : ""}
        className={classes.textField}
        onChange={onChange}
        error={error}
      />
      <Button 
        variant="contained"
        onClick={onClick}
      >Add Todo</Button>
    </Box>
  )
}
