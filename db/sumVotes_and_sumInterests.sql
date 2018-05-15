USE nuggets_db;

SELECT COUNT(vote_state) AS VOTES, COUNT(interest_state) AS INTERESTS
FROM choices
WHERE topic_id = 2;