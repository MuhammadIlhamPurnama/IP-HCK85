import React from 'react'
import { NavLink } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const MovieSlider = ({movies}) => {
  return (
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
  )
}

export default MovieSlider