// import { useState } from 'react'

import { Routes ,Route } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AddCandidate from './components/AddCandidate'
import VotingComponent from './components/Voting'
import Result from './components/Result';
import AdminDash from './components/AdminDash'
import Voted from './components/Voted'

function App() {
  return (
    <>
    {/* <Login/>*/}
    {/*<SignUp/> */}
    {/* <Admin/> */}
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/results" element={<Result/>}/> 
      <Route path="/admin" element={<Admin />}>
    <Route index element={<AdminDash />} />
    <Route path="add" element={<AddCandidate />} />
    <Route path="results" element={<Result />} />
    <Route path="home" element={<AdminDash />} />
  </Route>


      <Route path="/vote" element={<VotingComponent/>}/> 
      <Route path="/voted" element={<Voted/>} />
    </Routes>
    
    </>
  )
}

export default App
