module.exports = function(sequelize, DataTypes) {

    var Users = sequelize.define("Users", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        user_pw: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [7]
          }
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
        // ============================================================================
        // user_votes field may not be needed here, we'll leave it in for now
        //
        // ============================================================================
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

      Users.associate = function(models) {
        // topics have many choices
        Users.belongsToMany(models.Topics, {
          through: {
            model: models.Choices,
            unique: false
          },
          foreignKey: "user_id",
          constraints: false
        });
    };

    return Users;
};