import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'

function App() {
  

  return (
    <div className='m-0 p-0'>
    <Router>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </Router>

     
    </div>
  )
}

export default App
