'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {

    require("dotenv").config();

    return queryInterface.bulkInsert('Topics', [
      {
        topic_title: "What Is PHP?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "open", 
        topic_interest: 20, 
        topic_votes: 0,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is Ruby On Rails?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "open", 
        topic_interest: 10, 
        topic_votes: 0,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "How Do I Add Payments To My Site?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "pending", 
        topic_interest: 11, 
        topic_votes: 0,
        topic_assigned_to: 1,
        topic_created_by: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "How Do I Do Responsive Design?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "pending", 
        topic_interest: 22, 
        topic_votes: 0,
        topic_assigned_to: 2,
        topic_created_by: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "How Can I Use React To Build iOS Apps?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/8AIMskRMxOM",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 3,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/HgwCeNVPlo0",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/yfoY53QXEnI",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/XL9Ri8pO68w",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/Bv_5Zv5c-Ts",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/wSNa5b1mS5Y",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/zPHerhks2Vg",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/7TF00hJI78Y",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/Ggh_y-33Eso",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/hrZqiCUx6kg",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/aVn0tHZa0CQ",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        topic_title: "What Is The Difference Between MongoDB and SQL?",
        topic_body: "This is some short text to explain what the topic is about. In case you did not hear, this is some short text to explain what the topic is about.", 
        topic_state: "closed", 
        topic_interest: 10, 
        topic_votes: 0, 
        topic_video: "https://www.youtube.com/embed/hrZqiCUx6kg",
        topic_answer: "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", 
        topic_answer_url:"http://google.com",
        topic_assigned_to: 4,
        topic_created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
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