import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPage from '../views/admin.jsx'
import AllPosts from '../views/allPosts.jsx'
import Gallery from '../views/gallery.jsx'
 
 const Router2 = () => (
  <Routes basename={'https://admin.englishclassepsom.co.uk'}>
      <Route path={`${process.env.PUBLIC_URL}/`} element={<AdminPage />}   />
      <Route path={`${process.env.PUBLIC_URL}/allPosts`} element={<AllPosts />}   />
      <Route path={`${process.env.PUBLIC_URL}/gallery`} element={<Gallery />}   />
  </Routes>
)
 

export {Router2};