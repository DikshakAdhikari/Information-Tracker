import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Todos } from './components/Todos'
import { UpdateTodo } from './components/UpdateTodo'
import { Signup } from './components/Signup'
import { SignupWithReactFormHook } from './components/SIgnup-react-form'
import { SignupRhfWithZod } from './components/Signup-rhf-zod'


function App() {
  

  return (
    <div>
    <Router>
      <Routes>
        <Route path='/signup' element={<SignupRhfWithZod />} />
        <Route path='/' element={<Todos />} />
        <Route path='/updateTodo/:id' element={<UpdateTodo />} />
     
      </Routes>
    </Router>

     
    </div>
  )
}

export default App
