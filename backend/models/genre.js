'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Genre.hasMany(models.MovieGenre, {
      //   foreignKey: 'GenreId'
      // });
      Genre.belongsToMany(models.Movie, { through: 'MovieGenres' });
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Genre name must be unique'
      },
      validate: {
        notEmpty: {
          msg: 'Genre name is required'
        },
        notNull: {
          msg: 'Genre name is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};