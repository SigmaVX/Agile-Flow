// ===========================================================================
//
// File name: insert_data.js
// Description: Inserts data for nuggets / helpflow app
//
// ===========================================================================

$(document).ready(function() {

  var topicSeeds = [
    {
    "topic_title": "What Is PHP?",
    "topic_body": "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.",
    "topic_state": "open",
    "topic_interest": 20,
    "topic_votes": 0,
    "topic_answer": "",
    "topic_answer_url": ""
  },
  {
    "topic_title": "What Is ROR?",
    "topic_body": "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.",
    "topic_state": "pending",
    "topic_interest": 25,
    "topic_votes": 0,
    "topic_answer": "",
    "topic_answer_url": ""
  },
  {
    "topic_title": "How Do I Add Payments To My Site?",
    "topic_body": "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.",
    "topic_state": "closed",
    "topic_interest": 10,
    "topic_votes": 20,
    "topic_answer": "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!",
    "topic_answer_url": "http://google.com"
  },
  {
    "topic_title": "How Do I Use Angular?",
    "topic_body": "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.",
    "topic_state": "closed",
    "topic_interest": 100,
    "topic_votes": 20,
    "topic_answer": "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!",
    "topic_answer_url": "http://google.com"
  },
  {
    "topic_title": "What Is Difference Between Mongo and SQL?",
    "topic_body": "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.",
    "topic_state": "open",
    "topic_interest": 10,
    "topic_votes": 30,
    "topic_answer": "",
    "topic_answer_url": ""
  },
  {
    "topic_title": "How Do I Make Responsive Designs?",
    "topic_body": "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.",
    "topic_state": "open",
    "topic_interest": 20,
    "topic_votes": 0,
    "topic_answer": "",
    "topic_answer_url": ""
  },
  {
    "topic_title": "How Can I Use React To Build iOS Apps?",
    "topic_body": "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.",
    "topic_state": "pending",
    "topic_interest": 33,
    "topic_votes": 0,
    "topic_answer": "",
    "topic_answer_url": ""
  }
];

var userSeeds = [
  {
    "user_name": "Sigma",
    "user_rank": "Admin",
    "user_votes": 10
  },
  {
    "user_name": "Who First",
    "user_rank": "User",
    "user_votes": 7
  },
  {
    "user_name": "What Second",
    "user_rank": "User",
    "user_votes": 3
  },
  {
    "user_name": "Where Third",
    "user_rank": "User",
    "user_votes": 5
  },
  {
    "user_name": "When Home",
    "user_rank": "User",
    "user_votes": 0
  }
];


/*   console.log("in insert data.js");
  for (const data of topicSeeds) {
    console.log(JSON.stringify(data));
  }

  for (const data1 of userSeeds) {
    console.log(JSON.stringify(data1));
  } */

  // --------------------------------------------------------------------------------
  // post
  //
  $("#insert-seeds-btn").on("click", function(event) {
    var user = {},
        topic = {},
        numUser = 0,
        numTopic = 0;

    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("in insert-seeds-btn");

    // post data to api
    function loadUsers() {
      if (numUser >= userSeeds.length) {
        return true;
      }
      user = userSeeds[numUser];

      $.post("/api/users", user, function(userData) {
        console.log("created new user: " + userData);
      });
      numUser++;
      loadUsers();
      loadTopics();

      return true;
    }

    // post data to api
    function loadTopics() {
      if (numTopic >= topicSeeds.length) {
        return true;
      }
      topic = topicSeeds[numTopic];

      $.post("/api/topics", topic, function(topicData) {
        console.log("created new topic: " + topicData);
      });
      numTopic++;
      loadTopics();
      if (numTopic === topicSeeds.length) {
        location.reload();
      }

      return true;
    }

    // loadUsers
    loadUsers();

  });

});