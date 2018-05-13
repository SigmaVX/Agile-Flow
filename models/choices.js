module.exports = function(sequelize, DataTypes) {

  var Choices = sequelize.define("Choices", {
      vote_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      interest_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      underscored: true
    });

/*       Choices.associate = function(models) {
        // users can have many topics
        Choices.hasMany(models.Users, {
          "foreignKey": {"allowNull": false}
          // commented out for now
          // "onDelete": "cascade"
        });
      }; */

  return Choices;
};