import React, { useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router'
import http from '../lib/http'
import Swal from 'sweetalert2'

const ResgisterPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleRegister(e) {
    e.preventDefault()

    try {
      const response = await http.post('/register', form)

      Swal.fire({
        title: 'Success!',
        text: "Success register",
        icon: 'success',
        confirmButtonText: 'Close'
      })

      navigate('/login')
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }

  if (localStorage.getItem('access_token')) {
    return <Navigate to='/' />
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0d0d0d] to-[#1a1a1a] text-white px-4"
    style={{
      backgroundImage: `url(https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="w-full max-w-md bg-[#1f1f1f]/80 backdrop-blur-md rounded-xl shadow-xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-6 text-silver-200">Welcome</h2>
        <p className="text-sm text-center text-gray-400 mb-8">
          Register account to continue
        </p>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="you"
              onChange={handleChange}
              name="username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="you@example.com"
              onChange={handleChange}
              name="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="********"
              onChange={handleChange}
              name="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-400 hover:bg-slate-300 transition-colors py-2 rounded-md font-semibold text-black mt-4"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-6">
          Do have an account?{" "}
          <NavLink to='/login' className="text-slate-300 hover:underline">
            Log In here
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ResgisterPage