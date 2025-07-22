require('dotenv').config();
'use strict';
const axios = require('axios');

module.exports = {
  async up(queryInterface, Sequelize) {
    const movieGenres = [];

    for (let page = 1; page <= 15; page++) {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
        }
      });

      data.results.forEach(movie => {
        movie.genre_ids.forEach(genreId => {
          movieGenres.push({
            MovieId: movie.id,
            GenreId: genreId,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      });

      // Optional: delay between requests to avoid rate limit
      // await new Promise(resolve => setTimeout(resolve, 200)); 
    }

    await queryInterface.bulkInsert('MovieGenres', movieGenres, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MovieGenres', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
