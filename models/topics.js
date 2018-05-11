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
            allowNull: false,
            defaultValue: "https://youtu.be/8AIMskRMxOM",
            validate: {
                isUrl: true
            }
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
        topic_votes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        topic_created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        topic_assigned_to: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
      },

      {
        freezeTableName: true
      });

      return Topics;

};
