import { useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';

const routes = (
  <Router>
    <Routes>
      <Route path='/login' exact element={<Login />}/>
      <Route path='/signup' exact element={<SignUp />}/>
      <Route path='/home' exact element={<Home />}/>
    </Routes>
  </Router>
)

function App() {
  return (
    <>
    {routes}
    </>
  )
}

export default App
