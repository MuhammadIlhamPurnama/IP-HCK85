import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNewestMovies } from '../../store/newestSlice'
import MovieCard from '../global/MovieCard'


const MainSection = () => {
  const dispatch = useDispatch()
  const { movies, page, loading } = useSelector(state => state.newestMovies)

  useEffect(() => {
    dispatch(fetchNewestMovies(1))
  }, [dispatch])

  const handleSeeMore = () => {
    dispatch(fetchNewestMovies(page + 1))
  }

  return (
    <div className="min-h-screen bg-black py-32 px-4 md:px-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8">Newest Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 w-full max-w-5xl">
        {movies.map((movie, idx) => (
          <MovieCard movie={movie} idx={idx}/>
        ))}
      </div>
      <button
        className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition disabled:opacity-50"
        onClick={handleSeeMore}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'See more'}
      </button>
    </div>
  )
}

export default MainSection