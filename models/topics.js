module.exports = function(sequelize, DataTypes) {

    var Topics = sequelize.define("Topics", {
        topic_name: {
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
        }
      });
    
      return Topics;
};
