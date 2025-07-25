import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2'
import http from '../lib/http'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
)

const Infographic = () => {
  const [movieStats, setMovieStats] = useState({
    genres: [],
    popularity: [],
    ratings: [],
    years: [],
    loading: true
  })

  useEffect(() => {
    fetchMovieData()
  }, [])

  const fetchMovieData = async () => {
    try {
      const response = await http.get('/movies?limit=500', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      
      const movies = response.data.data
      processMovieData(movies)
    } catch (error) {
      console.error('Error fetching movie data:', error)
    } finally {
      setMovieStats(prev => ({ ...prev, loading: false }))
    }
  }

  const processMovieData = (movies) => {
    // Process genres
    const genreCount = {}
    movies.forEach(movie => {
      if (movie.Genres) {
        movie.Genres.forEach(genre => {
          genreCount[genre.name] = (genreCount[genre.name] || 0) + 1
        })
      }
    })

    // Process popularity ranges
    const popularityRanges = {
      'Low (0-100)': 0,
      'Medium (100-500)': 0,
      'High (500-1000)': 0,
      'Very High (1000+)': 0
    }
    
    movies.forEach(movie => {
      const pop = movie.popularity || 0
      if (pop < 100) popularityRanges['Low (0-100)']++
      else if (pop < 500) popularityRanges['Medium (100-500)']++
      else if (pop < 1000) popularityRanges['High (500-1000)']++
      else popularityRanges['Very High (1000+)']++
    })

    // Process ratings
    const ratingRanges = {
      '1-3': 0,
      '3-5': 0,
      '5-7': 0,
      '7-9': 0,
      '9-10': 0
    }
    
    movies.forEach(movie => {
      const rating = movie.vote_average || 0
      if (rating < 3) ratingRanges['1-3']++
      else if (rating < 5) ratingRanges['3-5']++
      else if (rating < 7) ratingRanges['5-7']++
      else if (rating < 9) ratingRanges['7-9']++
      else ratingRanges['9-10']++
    })

    // Process years
    const yearCount = {}
    movies.forEach(movie => {
      if (movie.release_date) {
        const year = new Date(movie.release_date).getFullYear()
        if (year >= 2020) {
          yearCount[year] = (yearCount[year] || 0) + 1
        }
      }
    })

    setMovieStats({
      genres: genreCount,
      popularity: popularityRanges,
      ratings: ratingRanges,
      years: yearCount,
      loading: false
    })
  }

  const genreChartData = {
    labels: Object.keys(movieStats.genres),
    datasets: [
      {
        label: 'Number of Movies',
        data: Object.values(movieStats.genres),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF'
        ],
      },
    ],
  }

  const popularityChartData = {
    labels: Object.keys(movieStats.popularity),
    datasets: [
      {
        label: 'Movies by Popularity',
        data: Object.values(movieStats.popularity),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const ratingChartData = {
    labels: Object.keys(movieStats.ratings),
    datasets: [
      {
        label: 'Movies by Rating',
        data: Object.values(movieStats.ratings),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.1,
      },
    ],
  }

  const yearChartData = {
    labels: Object.keys(movieStats.years).sort(),
    datasets: [
      {
        label: 'Movies Released',
        data: Object.keys(movieStats.years).sort().map(year => movieStats.years[year]),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        color: 'white'
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          boxWidth: 12,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        color: 'white'
      },
    },
  }

  if (movieStats.loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading infographic...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Movie Database Infographic
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Genre Distribution */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Genre Distribution</h2>
            <div className="h-96">
              <Pie data={genreChartData} options={pieOptions} />
            </div>
          </div>

          {/* Popularity Ranges */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Movies by Popularity</h2>
            <div className="h-80">
              <Bar data={popularityChartData} options={chartOptions} />
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Rating Distribution</h2>
            <div className="h-80">
              <Line data={ratingChartData} options={chartOptions} />
            </div>
          </div>

          {/* Movies by Year */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Movies by Release Year</h2>
            <div className="h-80">
              <Bar data={yearChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-600/30 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white">Total Genres</h3>
            <p className="text-3xl font-bold text-white">{Object.keys(movieStats.genres).length}</p>
          </div>
          <div className="bg-blue-600/30 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white">Most Popular Genre</h3>
            <p className="text-lg font-bold text-white">
              {Object.entries(movieStats.genres).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
            </p>
          </div>
          <div className="bg-purple-600/30 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white">High Rated Movies</h3>
            <p className="text-3xl font-bold text-white">{movieStats.ratings['7-9'] + movieStats.ratings['9-10']}</p>
          </div>
          <div className="bg-red-600/30 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white">Recent Movies</h3>
            <p className="text-3xl font-bold text-white">
              {Object.values(movieStats.years).reduce((a, b) => a + b, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Infographic