require('dotenv').config();
'use strict';
const axios = require('axios');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      
    const movies = []

    for (let page = 1; page <= 15; page++) {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
        }
      });

      const moviesFromPage = data.results.map(movie => ({
        adult: movie.adult,
        backdrop_path: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
        id: movie.id,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
        release_date: movie.release_date,
        title: movie.title,
        video: movie.video,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      movies.push(...moviesFromPage)
    }

    await queryInterface.bulkInsert('Movies', movies, {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movies', null, {restartIdentity: true});
  }
};
