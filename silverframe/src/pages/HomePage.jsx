import React from 'react'
import HeroSection from '../components/home/HeroSection'
import PopularMovies from '../components/home/PopularMovies'
import NewestMovies from '../components/home/NewestMovies'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PopularMovies />
      <NewestMovies />
    </>
  )
}

export default HomePage