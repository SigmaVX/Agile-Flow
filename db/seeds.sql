USE nuggets_db;

INSERT INTO users (user_name, user_rank, user_votes) VALUES 
("Sigma", "Admin", 10),
("Who First", "User", 7),
("What Second", "User", 3),
("Where Third", "User", 5),
("When Home", "User", 0);

INSERT INTO topics (topic_name, topic_body, topic_state, topic_interest, topic_votes, topic_answer, topic_answer_url) VALUES 
("What Is PHP?", "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.", "open", 20, 0),
("What Is ROR?", "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.", "pending", 25, 0),
("How Do I Add Payments To My Site?", "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.", "closed", 10, 20, "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!"),
("How Do I Use Angular?", "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.", "closed", 100, 20, "Some text for an answer.  Going to add this here as a placeholder.  Running out of things to say!", "http://google.com"),
("What Is Difference Between Mongo and SQL?", "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.", "open", 10, 30),
("How Do I Make Responsive Designs?", "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.", "open", 20, 0),
("How Can I Use React To Build iOS Apps?", "This is some short text to explain what the topic is about. This is some short text to explain what the topic is about.", "pending", 33, 0);
