import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Sidebar from './Sidebar'
import Add from './Add'
import Manage from './Manage'
import Dashboard from './Dashboard'
import Login from './Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sidebar' element={<Sidebar />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add' element={<Add />} />
          <Route path='/manage' element={<Manage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App