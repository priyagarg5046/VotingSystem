// import { useState } from 'react'

import { Routes ,Route } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin'
 import Login from './components/Login'
import SignUp from './components/SignUp'
import Voting from './components/Voting'
import AddCandidate from './components/AddCandidate'

function App() {

  return (
    <>
    {/* <Login/>*/}
    {/*<SignUp/> */}
    {/* <Admin/> */}
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/admin">
        <Route index element={<Admin/>}/>
        <Route path="addcandidate" element={<AddCandidate/>}/>
      </Route>

      <Route path="/vote" element={<Voting/>}/> 
    </Routes>
    </>
  )
}

export default App
