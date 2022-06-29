'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Review', {
    locationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    review: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    }
  }, {});
  Reviews.associate = function(models) {
    // associations can be defined here
    Reviews.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Reviews.belongsTo(models.Location, { foreignKey: 'locationId', onDelete: 'CASCADE' });
  };
  return Reviews;
};
