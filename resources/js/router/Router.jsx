import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from '../components/products/Index'
import NotFound from '../components/NotFound'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Index />}/>
            <Route path="/8" element={<NotFound />}/>
        </Routes>
    </div>
  )
}

export default Router