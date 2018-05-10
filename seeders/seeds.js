'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {

    require("dotenv").config();
    
      return queryInterface.bulkInsert('Users', [
      {
        user_name: "Sigma",
        user_rank: "Admin",
        user_votes: 10
      },
      {
        user_name: "User One",
        user_rank: "User",
        user_votes: 7
      }, 
      {
        user_name: "User Two",
        user_rank: "User",
        user_votes: 3
      },
      {
        user_name: "User Three",
        user_rank: "User",
        user_votes: 0
      },
    
    ], {});


    return queryInterface.bulkInsert('Topics', [
      {
        topic_title: "What Is PHP?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "open", 
        topic_interest: 20, 
        topic_votes: 0,
      },
      {
        topic_title: "What Is Ruby On Rails?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "open", 
        topic_interest: 10, 
        topic_votes: 0
      },
      {
        topic_title: "How Do I Add Payments To My Site?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "pending", 
        topic_interest: 11, 
        topic_votes: 0,
        topic_assigned_to: 1,
      },
      {
        topic_title: "How Do I Do Responsive Design?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "pending", 
        topic_interest: 22, 
        topic_votes: 0,
        topic_assigned_to: 2
      },
      {
        topic_title: "How Can I Use React To Build iOS Apps?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 3 
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4
      },
      
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
