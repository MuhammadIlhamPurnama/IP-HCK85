import React, { useEffect, useState } from 'react'

const slides = [
  {
    title: 'MAGIC SLIDER',
    highlight: 'PLANT',
    desc: 'Nikmati keindahan tanaman dengan slider interaktif dan visual memukau.',
    bg: 'https://image.tmdb.org/t/p/w780/7HqLLVjdjhXS0Qoz1SgZofhkIpE.jpg',
    cards: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
      'https://image.tmdb.org/t/p/w500/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ]
  },
  {
    title: 'MAGIC SLIDER',
    highlight: 'SUNSET',
    desc: 'Rasakan suasana senja yang menenangkan dengan koleksi gambar sunset.',
    bg: 'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1200&q=80',
    cards: [
      'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=400&q=80',
      'https://image.tmdb.org/t/p/w500/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    ]
  },
  // Tambahkan slide lain sesuai kebutuhan
]

const HeroSection = () => {
  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

  // AUTOSCROLL EFFECT
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 4000) // Ganti 4000 jadi 3000 untuk 3 detik, dst
    return () => clearInterval(interval)
  }, [current])

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-16 w-1/2">
        <h1 className="text-5xl font-bold text-white">{slide.title}</h1>
        <h2 className="text-4xl font-bold text-green-400 mt-2">{slide.highlight}</h2>
        <p className="text-white mt-4 mb-8 max-w-md">{slide.desc}</p>
        {/* Slider Controls */}
        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white text-2xl hover:bg-green-500 transition"
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white text-2xl hover:bg-green-500 transition"
            aria-label="Next"
          >
            &gt;
          </button>
        </div>
      </div>
      {/* Cards */}
      <div className="absolute bottom-8 right-16 flex gap-4 z-10">
        {slide.cards.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            className="w-32 h-44 object-cover rounded-xl shadow-lg border-4 border-white/30 bg-white/10"
            style={{ opacity: idx === 0 ? 1 : 0.8 }}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSection