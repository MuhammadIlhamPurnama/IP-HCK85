import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import http from '../../lib/http';
import { NavLink, useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await http.get('/movies/popular', {
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
    <section className="bg-black py-8 sm:py-12 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Popular Movies</h2>
        <button
          className="border border-white text-white px-4 sm:px-6 py-2 rounded-full hover:bg-white hover:text-black transition cursor-pointer text-sm sm:text-base"
          onClick={() => navigate('/popular')}
        >
          View more
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          412: { slidesPerView: 2 },
          616: { slidesPerView: 3 },
          885: { slidesPerView: 4 },
          1024: { slidesPerView: 5 }
        }}
        className="py-4"
      >
        {movies.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <NavLink
              to={`/detail/${movie.id}`}
              className="w-full h-[240px] sm:h-[260px] md:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700 shadow-md bg-[#0f0f0f] hover:shadow-lg hover:scale-105 transition duration-300 block"
            >
              <img
                src={movie.poster_path}
                alt={movie.original_title}
                className="w-full h-full object-cover"
              />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default PopularMovies