import { useEffect, useState } from "react"
import { Navigate, NavLink, useNavigate } from "react-router"
import http from "../lib/http"
import Swal from "sweetalert2"

export default function LoginPage() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await http.post('/login', form)

      Swal.fire({
        title: 'Success!',
        text: "Success Login",
        icon: 'success',
        confirmButtonText: 'Close'
      })

      localStorage.setItem('access_token', response.data.access_token)

      navigate('/')
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }

  async function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);

    try {
      const balikan = await http.post('/google-login', {
        googleToken: response.credential
      })
      // console.log(balikan)

      // simpan token ke browser supaya nantinya bisa dikirim saat kita request lg ke server
      localStorage.setItem('access_token', balikan.data.access_token)

      // pindah halaman saat berhasil nambah data ke Home
      // changePage('Home')
      navigate('/')
    }
    catch (error) {
      // console.log(error, "<<<");

      let errorMessage = 'Something went wrong!'
      if (error.response) {
        // error.response.data -> response body kita saat error
        errorMessage = error.response.data.message
      }

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Close'
      })

    }
  }

  function handleInitializeGoogleLogin () {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      locale: 'en'
    });
    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { 
        theme: "outline", 
        size: "large",
        width: "384",
        text: "signin_with",
        shape: "rectangular"
      }
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }

  useEffect(() => {
    handleInitializeGoogleLogin()
  }, [])

  if (localStorage.getItem('access_token')) {
    return <Navigate to='/' />
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0d0d0d] to-[#1a1a1a] text-white px-4 sm:px-6 lg:px-8"
    style={{
      backgroundImage: `url(https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="w-full max-w-sm sm:max-w-md bg-[#1f1f1f]/80 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 border border-white/10 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-silver-200">Welcome Back</h2>
        <p className="text-xs sm:text-sm text-center text-gray-400 mb-6 sm:mb-8">
          Login to your account to continue
        </p>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="you@example.com"
              onChange={handleChange}
              name="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="********"
              onChange={handleChange}
              name="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-400 hover:bg-slate-300 transition-colors py-2 sm:py-3 rounded-md font-semibold text-black mt-4 text-sm sm:text-base"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 w-full flex justify-center" id="google-btn"></div>

        <div className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <NavLink to='/register' className="text-slate-300 hover:underline">
            Sign up here
          </NavLink>
        </div>
      </div>
    </div>
  );
}
