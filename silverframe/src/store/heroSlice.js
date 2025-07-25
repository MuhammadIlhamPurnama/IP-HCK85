import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../lib/http'

export const fetchSlides = createAsyncThunk(
  'hero/fetchSlides',
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get('/movies', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      const movies = response.data.data
      const slidesFetched = movies.slice(0, 5).map((movie, idx) => ({
        title: 'MAGIC SLIDER',
        highlight: movie.original_title || 'MOVIE',
        desc: movie.overview || 'Deskripsi tidak tersedia.',
        bg: movie.backdrop_path,
        cards: movies.slice(idx, idx + 4).map(m => m.poster_path),
        cardIds: movies.slice(idx, idx + 4).map(m => m.id),
      }))
      return { slides: slidesFetched, movies }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    slides: [],
    movies: [],
    loading: false,
    error: null,
    current: 0
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload
    },
    nextSlide: (state) => {
      state.current = (state.current === state.slides.length - 1 ? 0 : state.current + 1)
    },
    prevSlide: (state) => {
      state.current = (state.current === 0 ? state.slides.length - 1 : state.current - 1)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlides.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSlides.fulfilled, (state, action) => {
        state.loading = false
        state.slides = action.payload.slides
        state.movies = action.payload.movies
      })
      .addCase(fetchSlides.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { setCurrent, nextSlide, prevSlide } = heroSlice.actions
export default heroSlice.reducer