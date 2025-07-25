import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isPopular = location.pathname === '/popular'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const avatarRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 
        ${isPopular ? 'bg-gray-600/30' : scrolled ? 'bg-black' : 'bg-black/0'}
        flex items-center justify-between px-6 md:px-10 h-16`}
    >
      <NavLink to='/' className="text-2xl font-bold text-gray-300 tracking-wider">Silver Frame</NavLink>

      {/* Hamburger */}
      <button
        className="md:hidden text-white text-3xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-white font-medium">
        <li><NavLink to="/popular">Popular</NavLink></li>
        <li><NavLink to="/newest">Newest</NavLink></li>
        <li><NavLink to="/thread">Thread</NavLink></li>
        <li><NavLink to="/ai-assistant">AI Assistant</NavLink></li>
        <li><NavLink to="/Infographic">Infographic</NavLink></li>
      </ul>

      {/* Avatar Dropdown (Desktop) */}
      <div className="hidden md:flex items-center text-white relative" ref={avatarRef}>
        <span
          onClick={() => setAvatarOpen(prev => !prev)}
          className="text-2xl cursor-pointer"
        >
          🧑🏻
        </span>

        {avatarOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white text-black rounded shadow-lg min-w-[120px] py-2 z-50">
            <button
              onClick={() => {
                localStorage.removeItem('access_token')
                navigate('/login')
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 flex flex-col items-center py-4 gap-4 md:hidden z-50">
          <ul className="flex flex-col gap-4 text-white font-medium">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/popular">Popular</NavLink></li>
            <li><NavLink to="/newest">Newest</NavLink></li>
            <li><NavLink to="/thread">Thread</NavLink></li>
            <li><NavLink to="/ai-assistant">AI Assistant</NavLink></li>
            <li><NavLink to="/Infographic">Infographic</NavLink></li>
          </ul>
          <div className="flex items-center gap-5 text-white mt-2">
            <span
              onClick={() => {
                localStorage.removeItem('access_token')
                navigate('/login')
              }}
              className="text-xl cursor-pointer"
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
