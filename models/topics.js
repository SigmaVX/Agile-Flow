module.exports = function(sequelize, DataTypes) {
    var Topics = sequelize.define("Topics", {

        topic_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topic_body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        topic_video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        topic_answer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        topic_answer_url:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        topic_state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Open"
        },
        topic_interest: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        topic_created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        topic_assigned_to: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        // ===================================================================================
        // topic_votes may not be necessary to store here, we'll leave it in for now
        // ==================================================================================
        // ==
        // do 'before hook' to set topic_votes to a function that calculates topic_votes by
        // doing a query on the choices database
        // ==
        topic_votes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        }
      },

      {
        freezeTableName: true,
        underscored: true
      });


    Topics.associate = function(models) {
        // topics have many choices
        Topics.belongsToMany(models.Users, {
          through: {
            model: models.Choices,
            unique: false
          },
          foreignKey: "topic_id",
          constraints: false
        });
    };


      return Topics;

};