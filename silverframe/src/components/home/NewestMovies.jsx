import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import http from '../../lib/http';
import { NavLink } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import MovieSlider from './MovieSlider';

const NewestMovies = () => {
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    try {
      const response = await http.get('/movies/newest', {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setMovies(response.data.data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error get data',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }
  
  useEffect(() => {
    fetchMovies();
  },[])

  return (
    <section className="bg-black py-8 sm:py-12 pb-24 sm:pb-40 px-4 sm:px-6 md:px-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Newest Movies</h2>
        <NavLink to='/newest' className="border border-white text-white px-4 sm:px-6 py-2 rounded-full hover:bg-white hover:text-black transition cursor-pointer text-sm sm:text-base">
          View more
        </NavLink>
      </div>
      <MovieSlider movies={movies} />
    </section>
  )
}

export default NewestMovies