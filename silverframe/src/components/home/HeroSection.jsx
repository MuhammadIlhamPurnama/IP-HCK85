import React, { useEffect, useState } from 'react'
import http from '../../lib/http'
import { NavLink } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSlides, nextSlide, prevSlide, setCurrent } from '../../store/heroSlice'

const HeroSection = () => {
  const dispatch = useDispatch()
  const { slides, current, loading } = useSelector(state => state.hero)

  useEffect(() => {
    dispatch(fetchSlides())
  }, [dispatch])

  useEffect(() => {
    if (!slides.length) return
    const interval = setInterval(() => {
      dispatch(nextSlide())
    }, 4000)
    return () => clearInterval(interval)
  }, [current, slides.length, dispatch])

  if (!slides.length) {
    return <div className="h-screen flex items-center justify-center text-white">Loading...</div>
  }

  const slide = slides[current]

  return (
    <div
      className="relative h-screen flex items-center"
      style={{
        backgroundImage: `url(${slide.bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s',
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Main Content - Responsive */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8 md:px-16 w-full lg:w-1/2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mt-2">
          {slide.highlight}
        </h2>
        <p className="text-white mt-4 mb-8 max-w-md text-sm sm:text-base line-clamp-5">
          {slide.desc}
        </p>
        
        {/* Navigation Buttons - Responsive positioning */}
        <div className="flex gap-3 lg:hidden justify-center">
          <button
            onClick={() => { dispatch(prevSlide())}}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-400 flex items-center justify-center text-white text-xl sm:text-2xl font-bold leading-none hover:bg-green-500 transition"
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={() => { dispatch(nextSlide())}}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-400 flex items-center justify-center text-white text-xl sm:text-2xl font-bold leading-none hover:bg-green-500 transition"
            aria-label="Next"
          >
            &gt;
          </button>
        </div>

        {/* Desktop Navigation Buttons */}
        <div className="hidden lg:flex gap-3">
          <button
            onClick={() => { dispatch(prevSlide())}}
            className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white text-2xl font-bold leading-none hover:bg-green-500 transition"
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={() => { dispatch(nextSlide())}}
            className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white text-2xl font-bold leading-none hover:bg-green-500 transition"
            aria-label="Next"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Movie Cards - Responsive */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 md:right-16 flex gap-2 sm:gap-4 z-10">
        {slide.cards.slice(0, window.innerWidth < 640 ? 2 : window.innerWidth < 768 ? 3 : 4).map((img, idx) => (
          <NavLink
            key={idx}
            to={`/detail/${slide.cardIds[idx]}`}
            className="focus:outline-none"
          >
            <img
              src={img}
              alt=""
              className="w-20 h-28 sm:w-24 sm:h-32 md:w-32 md:h-44 object-cover rounded-lg sm:rounded-xl shadow-lg border-2 sm:border-4 border-white/30 bg-white/10 cursor-pointer hover:scale-105 transition"
              style={{ opacity: idx === 0 ? 1 : 0.8 }}
            />
          </NavLink>
        ))}
      </div>

      {/* Dots Indicator - Mobile only */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 lg:hidden">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => dispatch(setCurrent(idx))}
            className={`w-2 h-2 rounded-full transition ${
              idx === current ? 'bg-green-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSection