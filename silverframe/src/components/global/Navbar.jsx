import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 
        ${scrolled ? 'bg-black' : 'bg-black/0'}
        flex items-center justify-between px-6 md:px-10 h-16`}
    >
      <div className="text-2xl font-bold text-gray-300 tracking-wider">Silver Frame</div>
      
      {/* Hamburger button */}
      <button
        className="md:hidden text-white text-3xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      {/* Menu Desktop */}
      <ul className="hidden md:flex gap-6 text-white font-medium">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">Series</li>
        <li className="cursor-pointer">Films</li>
        <li className="cursor-pointer">Games</li>
        <li className="cursor-pointer">New &amp; Popular</li>
        <li className="cursor-pointer">My List</li>
        <li className="cursor-pointer">Browse by Language</li>
      </ul>
      <div className="hidden md:flex items-center gap-5 text-white">
        <span className="text-lg cursor-pointer">🔍</span>
        <span className="cursor-pointer">Kids</span>
        <span className="relative cursor-pointer">
          🔔
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1">1</span>
        </span>
        <span className="text-2xl cursor-pointer">😊</span>
      </div>

      {/* Dropdown Mobile */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 flex flex-col items-center py-4 gap-4 md:hidden z-50">
          <ul className="flex flex-col gap-4 text-white font-medium">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Series</li>
            <li className="cursor-pointer">Films</li>
            <li className="cursor-pointer">Games</li>
            <li className="cursor-pointer">New &amp; Popular</li>
            <li className="cursor-pointer">My List</li>
            <li className="cursor-pointer">Browse by Language</li>
          </ul>
          <div className="flex items-center gap-5 text-white mt-2">
            <span className="text-lg cursor-pointer">🔍</span>
            <span className="cursor-pointer">Kids</span>
            <span className="relative cursor-pointer">
              🔔
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1">1</span>
            </span>
            <span className="text-2xl cursor-pointer">😊</span>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar