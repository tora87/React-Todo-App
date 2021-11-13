import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { Modal } from './Modal'
import { makeStyles } from '@mui/styles'
import { Container} from '@mui/material'
import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import 
{ 
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  orderBy, 
  query
} from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const TodoPage = () => {
  const [todos,setTodos] = useState([])
  const [open,setOpen] = useState(false)
  const [todoInfo,setTodoInfo] = useState({})

  async function getData(db) {
    const todosRef = collection(db, 'todos')
    const q = query(todosRef,orderBy('created','desc'))
    const todoSnapshot = await getDocs(q)
    const todoList = todoSnapshot.docs.map(doc => doc.data())

    setTodos(todoList)
    return todoList;
  }

  useEffect(() => {
    getData(db)
  },[])

  const getMax = () => {
    let max = 0
  
    if (!todos) return

    todos.forEach(data => {
      if(max < data['id']) max = data['id']
    })

    return max+1
  }

  const addTodo = async (task) => {
    await setDoc(doc(db,'todos',getMax().toString()),{
      id: getMax(),
      task:task,
      status:false,
      created: new Date().getTime()
    })
    getData(db)
  }

  const removeTodo = async(id) => {
    await deleteDoc(doc(db, 'todos', id.toString()))
    getData(db)
  }

  const editStatus = async(id,newStatus) => {
    await updateDoc(doc(db,'todos',id.toString()),{
      status:newStatus
    })
    getData(db)
  }

  const changeName = async(id,newTask) =>{
    await updateDoc(doc(db,'todos',id.toString()), {
      task:newTask
    })
    closeHandle()
    getData(db)
  }

  const openHandle = (todoInfo=null) => {
    if (todoInfo === null) return
    setOpen(true)
    setTodoInfo(todoInfo)
  }

  const closeHandle = () => {
    setOpen(false)
  }


  const useStyles = makeStyles(() => ({
    container: {
      padding: 50,
      textAlign: 'center'
    },
    h1: {
      margin: '30px 0',
    }
  }))

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <h1 className={classes.h1}>React Todo</h1>
      <TodoForm addTodo={addTodo}/>
      <TodoList 
        todos={todos}
        removeTodo={removeTodo} 
        openHandle={openHandle} 
        editStatus={editStatus}/>
      <Modal
        openHandle={openHandle}
        closeHandle={closeHandle}
        changeName={changeName}
        open={open}
        todoInfo={todoInfo}
        />
    </Container>
  )
}
