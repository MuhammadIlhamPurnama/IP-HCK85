'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adult: {
        type: Sequelize.BOOLEAN
      },
      backdrop_path: {
        type: Sequelize.STRING
      },
      original_language: {
        type: Sequelize.STRING
      },
      original_title: {
        type: Sequelize.STRING
      },
      overview: {
        type: Sequelize.TEXT
      },
      popularity: {
        type: Sequelize.FLOAT
      },
      poster_path: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.DATE
      },
      title: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.BOOLEAN
      },
      vote_average: {
        type: Sequelize.FLOAT
      },
      vote_count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};