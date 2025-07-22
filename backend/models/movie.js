'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.hasMany(models.MovieGenre, {
        foreignKey: 'MovieId'
      });
    }
  }
  Movie.init({
    adult: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Adult status is required'
        },
        notNull: {
          msg: 'Adult status is required'
        }
      } 
    },
    backdrop_path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Backdrop path is required'
        },
        notNull: {
          msg: 'Backdrop path is required'
        }
      } 
    },
    original_language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Original language is required'
        },
        notNull: {
          msg: 'Original language is required'
        }
      } 
    },
    original_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Original title is required'
        },
        notNull: {
          msg: 'Original title is required'
        }
      } 
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Overview is required'
        },
        notNull: {
          msg: 'Overview is required'
        }
      } 
    },
    popularity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Popularity is required'
        },
        notNull: {
          msg: 'Popularity is required'
        }
      } 
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Poster path is required'
        },
        notNull: {
          msg: 'Poster path is required'
        }
      } 
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Release date is required'
        },
        notNull: {
          msg: 'Release date is required'
        }
      } 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        notNull: {
          msg: 'Title is required'
        }
      } 
    },
    video: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Video is required'
        },
        notNull: {
          msg: 'Video is required'
        }
      } 
    },
    vote_average: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Vote average is required'
        },
        notNull: {
          msg: 'Vote average is required'
        }
      } 
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Vote count is required'
        },
        notNull: {
          msg: 'Vote count is required'
        }
      } 
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};