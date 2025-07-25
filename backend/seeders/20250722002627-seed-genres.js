require('dotenv').config();
'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const {data} = await axios({
      method: "GET",
      url: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      },
      // req.body
      // data: {}
    })
    //  await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
    //   headers: {
    //     Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    // }})

    const genres = data.genres.map(genre => {
      return {
        id: genre.id,
        name: genre.name,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
    await queryInterface.bulkInsert('Genres', genres, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Genres', null, {restartIdentity: true});
  }
};
