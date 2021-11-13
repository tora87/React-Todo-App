import { Layout } from './components/Layout';
import { TodoPage } from './components/TodoPage';
import { useEffect } from 'react'

export const App = () => {
  useEffect(() => {
    document.title = 'React Todo'
  }, [])

  return (
    <Layout>
      <TodoPage/>
    </Layout>
  );
}
