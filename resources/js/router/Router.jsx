import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from '../components/products/Index'
import New from '../components/products/New'
import Edit from '../components/products/Edit'
import NotFound from '../components/NotFound'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Index />}/>
            <Route path="/product/new" element={<New />}/>
            <Route path="/product/edit/:id" element={<Edit />}/>
            <Route path="/*" element={<NotFound />}/>
        </Routes>
    </div>
  )
}

export default Router