'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {

    require("dotenv").config();

    return queryInterface.bulkInsert('Choices', [
      {
        vote_state: 1,
        interest_state: 1,
        user_id: 3,
        topic_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        vote_state: 0,
        interest_state: 1,
        user_id: 2,
        topic_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        vote_state: 1,
        interest_state: 0,
        user_id: 1,
        topic_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        vote_state: 0,
        interest_state: 1,
        user_id: 4,
        topic_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        vote_state: 1,
        interest_state: 0,
        user_id: 3,
        topic_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        vote_state: 1,
        interest_state: 1,
        user_id: 5,
        topic_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
      
    ], {});
  },


  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};