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

/*       Topics.associate = function(models) {
        // topics have many users
        // A topic can't be created without a user due to the foreign key constraint
        Topics.belongsTo(models.Users, {
          "foreignKey": {"allowNull": false}
          // when a topic is deleted, also delete any associated Users, commented out for now
          // "onDelete": "cascade"
        });
      }; */

      return Topics;

};
