import React from 'react'
import Navbar from '../components/global/Navbar'
import { Navigate, Outlet } from 'react-router'
import Footer from '../components/global/Footer'

const HomeLayout = () => {

  if (!localStorage.getItem('access_token')) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  )
}

export default HomeLayout