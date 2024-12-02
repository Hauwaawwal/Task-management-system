import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';
// import Forgotpass from './components/Forgotpass';


function App() {
  return (
    
    <div>
       <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/main' element={<Main/>}/>
        {/* <Route path='/forgotpass' element={<Forgotpass/>}/> */}
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
