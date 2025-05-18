import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Resume from './Pages/Resume/Resume'
import Coverletter from './Pages/CoverLetter/Coverletter'
import Nav from './Component/Nav/Nav'
import Bubbles from './Component/Bubble/Bubble'
const App = () => {
  return (
    <div className='lo'>
       <BrowserRouter>
        <Nav/>
          <Routes>
              <Route path='/' element={<Home/>}/>
               <Route path='/Resume' element={<Resume/>}/>
               <Route path='/Coverletter' element={<Coverletter/>}/>
          </Routes>
          <Bubbles/>
  
       </BrowserRouter>
    </div>
  )
}
export default App