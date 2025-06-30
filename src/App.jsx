import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from "./Pages/Home"
import Coin from "./Pages/Coin"
import Footer from "./Components/Footer"
import Login from './Components/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        navigate('/')
      }
      else{
        navigate('/login')
      }

    })

  },[])


  return (
    <>
    <div className="app min-h-screen pb-1 text-white">
    <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element= {<Home/>}   />
        <Route path='/login' element= {<Login/>}   />
        <Route  path='/coin/:coinid'  element={<Coin/>}/>
      </Routes>
      <Footer/>

    </div>
    
       
    </>
  )
}

export default App
