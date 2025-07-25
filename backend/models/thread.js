'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Thread.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  }
  Thread.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'User Id is required'
        },
        notNull: {
          msg: 'User Id is required'
        },
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Content is required'
        },
        notNull: {
          msg: 'Content is required'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Thread',
  });
  return Thread;
};