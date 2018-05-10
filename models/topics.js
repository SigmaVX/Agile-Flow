module.exports = function(sequelize, DataTypes) {

    var Topics = sequelize.define("Topics", {
        topic_name: DataTypes.STRING,
      });
    
      return Topics;
};
