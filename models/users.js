// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");

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

      // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
      Users.prototype.validPassword = function(user_pw) {
        return bcrypt.compareSync(user_pw, this.user_pw);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      Users.hook("beforeCreate", function(user) {
        user.user_pw = bcrypt.hashSync(user.user_pw, bcrypt.genSaltSync(10), null);
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