'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Image', {
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Location',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING(250),
      allowNull: true
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
  Images.associate = function(models) {
    // associations can be defined here
    Images.belongsTo(models.Location, { foreignKey: 'locationId'});
  };
  return Images;
};
