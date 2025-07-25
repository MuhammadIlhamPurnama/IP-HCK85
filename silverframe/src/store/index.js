import { configureStore } from '@reduxjs/toolkit'
import heroReducer from './heroSlice'
import newestMoviesReducer from './newestSlice'
import popularMoviesReducer from './popularSlice'



export default configureStore({
  reducer: {
    hero: heroReducer,
    newestMovies: newestMoviesReducer,
    popularMovies: popularMoviesReducer,
  }
})