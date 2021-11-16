import { TodoPage } from './components/TodoPage';
import { useEffect } from 'react'

export const App = () => {
  useEffect(() => {
    document.title = 'React Todo'
  }, [])

  return (
    <TodoPage/>
  );
}
