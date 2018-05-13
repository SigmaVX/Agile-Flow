module.exports = function(sequelize, DataTypes) {

    var Users = sequelize.define("Users", {

        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_photo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "https://placem.at/things?w=250&h=250&random=some_seed",
            validate: {
                isUrl: true
            }
        },
        user_rank: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user"
        },
        user_votes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
      },
      
      {
        freezeTableName: true,
        underscored: true
      });

/*       Users.associate = function(models) {
        // users can have many topics
        Users.hasMany(models.Topics, {
          "foreignKey": {"allowNull": false}
          // when a user is deleted, also delete any associated Topics, commented out for now
          // "onDelete": "cascade"
        });
      }; */

      return Users;

};