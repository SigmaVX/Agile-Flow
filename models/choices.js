module.exports = function(sequelize, DataTypes) {

  var Choices = sequelize.define(
    "Choices", {
      vote_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      interest_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      freezeTableName: true,
      underscored: true
    }
  );

  return Choices;
};