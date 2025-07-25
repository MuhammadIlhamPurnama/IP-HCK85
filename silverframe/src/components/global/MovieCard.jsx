import React from 'react'
import { NavLink } from 'react-router'

const MovieCard = ({movie, idx}) => {
  return (
    <NavLink
      to={`/detail/${movie.id}`}
      key={idx}
      className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center transform transition duration-300 hover:scale-105 hover:z-10"
    >
      <img
        src={movie.poster_path}
        alt={movie.original_title}
        className="w-full h-80 object-cover"
      />
    </NavLink>
  )
}

export default MovieCard