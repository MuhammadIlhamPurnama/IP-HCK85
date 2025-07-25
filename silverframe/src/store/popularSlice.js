import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../lib/http'

export const fetchPopularMovies = createAsyncThunk(
  'popularMovies/fetchPopularMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await http.get(`/movies/popular?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      return { data: response.data.data, page }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState: {
    movies: [],
    page: 1,
    loading: false,
    error: null
  },
  reducers: {
    resetPopularMovies: (state) => {
      state.movies = []
      state.page = 1
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false
        state.page = action.payload.page
        if (action.payload.page === 1) {
          state.movies = action.payload.data
        } else {
          state.movies = [...state.movies, ...action.payload.data]
        }
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { resetPopularMovies } = popularMoviesSlice.actions
export default popularMoviesSlice.reducer