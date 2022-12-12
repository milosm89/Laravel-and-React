import React from 'react'
import { Routes, Router } from 'react-router-dom'
import Index from '../componsnts/products/Index'
import NotFound from '../components/products/NotFound'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={ <Index/> }/>
            <Route path="/*" element={ <NotFound/> }/>
        </Routes>
    </div>
  )
}

export default Router