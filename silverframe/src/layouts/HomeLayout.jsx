import React from 'react'
import Navbar from '../components/global/Navbar'
import { Outlet } from 'react-router'

const HomeLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  )
}

export default HomeLayout