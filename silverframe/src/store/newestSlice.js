import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../lib/http'

export const fetchNewestMovies = createAsyncThunk(
  'newestMovies/fetchNewestMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await http.get(`/movies/newest?page=${page}`, {
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

const newestMoviesSlice = createSlice({
  name: 'newestMovies',
  initialState: {
    movies: [],
    page: 1,
    loading: false,
    error: null
  },
  reducers: {
    resetMovies: (state) => {
      state.movies = []
      state.page = 1
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewestMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNewestMovies.fulfilled, (state, action) => {
        state.loading = false
        state.page = action.payload.page
        if (action.payload.page === 1) {
          state.movies = action.payload.data
        } else {
          state.movies = [...state.movies, ...action.payload.data]
        }
      })
      .addCase(fetchNewestMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { resetMovies } = newestMoviesSlice.actions
export default newestMoviesSlice.reducer