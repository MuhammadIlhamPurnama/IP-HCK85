import React, { useEffect, useState } from 'react'
import http from '../../lib/http'
import { useParams } from 'react-router'

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

const MainSection = () => {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await http.get(`/movies/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        setMovie(response.data)
      } catch (error) {
        // Handle error sesuai kebutuhan
      }
      setLoading(false)
    }
    fetchMovie()
  }, [id])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Movie not found.
      </div>
    )
  }

  return (
  <div
    className="min-h-screen py-24 px-4 md:px-16 flex flex-col md:flex-row items-center md:items-start gap-12 relative"
    style={{
      backgroundImage: `url(${movie.backdrop_path})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 bg-black/80 z-0"></div>
    {/* Poster */}
    <div className="w-full md:w-1/3 flex justify-center z-10">
      <img
        src={movie.poster_path}
        alt={movie.original_title}
        className="w-64 h-96 object-cover rounded-2xl shadow-lg border-4 border-white/10 bg-gray-800"
      />
    </div>
    {/* Detail */}
    <div className="w-full md:w-2/3 flex flex-col justify-between h-full z-10">
      <div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">{movie.original_title}</h1>
          <p className="text-gray-300 mb-6">{movie.overview}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-green-600 text-white px-4 py-1 rounded-xl text-sm font-semibold">
              {formatDate(movie.release_date)}
            </span>
            <span className="block bg-blue-600 text-white px-4 py-1 rounded-xl text-sm font-semibold">
              Rating: {movie.vote_average}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-full text-white font-semibold mb-1">Genre :</div>
            {movie.Genres && movie.Genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs flex items-center justify-center"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  </div>
)
}

export default MainSection