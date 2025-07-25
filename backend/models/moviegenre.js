'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // MovieGenre.belongsTo(models.Movie, {
      //   foreignKey: 'MovieId'
      // });
      // MovieGenre.belongsTo(models.Genre, {
      //   foreignKey: 'GenreId'
      // });
    }
  }
  MovieGenre.init({
    MovieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'MovieId is required'
        },
        notNull: {
          msg: 'MovieId is required'
        }
      }
    },
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'MovieId is required'
        },
        notNull: {
          msg: 'MovieId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'MovieGenre',
  });
  return MovieGenre;
};