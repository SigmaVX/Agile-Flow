$(document).ready(function() {

// Run on page load to turn vote and interest state to true where applicable 
function loadChoices(){

    var userId = parseInt($("#user").data("data-id"), 10);

    if(userId){

        $.ajax({
            url: "/api/interest/user/"+userId,
            type: "GET"
        }).then(function(data) {
        // console.log("Interest Data:" , data);
            
            // Loop through choices data to change topics to true
            for (var i = 0; i < data.choices.length; i++){
                // console.log("Topic Picked For Loop Test: ", data.choices[i].topic_id);
                $("#user-interest-"+data.choices[i].topic_id).text("I'm Interested");
                $("#interest-btn-"+data.choices[i].topic_id).attr("interest-state", "true");
            };  
            
            $.ajax({
                url: "/api/votes/user/"+userId,
                type: "GET"
            }).then(function(voteData) {
            // console.log("Vote Data:" , voteData);
                
                // Loop through choices data to change topics to true
                for (var i = 0; i < voteData.choices.length; i++){
                    // console.log("test", data.choices[i].topic_id);
                    $("#vote-text-"+voteData.choices[i].topic_id).text("I Voted For This");
                    $("#vote-btn-"+voteData.choices[i].topic_id).attr("vote-state", "true");
                };  
            });
        });
    };
};


// Post Answer Vote
function answerVote(vote_state, topic_id){

    // Store The state of the vote for topic selected 
    var voteState = vote_state;
    var topicId = parseInt(topic_id);
    var userId = parseInt($("#user").data("data-id"), 10);

    // Pull total vote for this topic
    $.ajax({
        url: "/api/choices/totals/vote/"+topicId,
        type: "GET",
    }).then(function(data) {
        // console.log("Total Vote Data Stored: ", data[0].total_votes);
        var totalVote = parseInt(data[0].total_votes);

        // Toggles vote state
        if(voteState === "true"){
            voteState = 0;
            totalVote--;
        } else{
            voteState = 1;
            totalVote++;
        };

        // Stores vote, user id, and topic id.  
        var userVote = {
            user_id: userId,
            topic_id: topicId,
            vote_state: voteState
        };   
        // console.log("User Vote: ", userVote);


        // Checks if IDs exists on Choices.  
        $.ajax({
            url: "/api/choices/check/"+userId+"/"+topicId,
            type: "GET",
        }).then(function(data) {
            // console.log("Check Exists: ", data);
            var updateType = "";
            
            // Set the type of AJAX on Choices
            if(data === true){
                updateType = "PUT"
            } else{
                updateType = "POST"
            };

            // Update choices table
            $.ajax({
                url: "/api/choices/updates/vote",
                type: updateType,
                data: userVote
            }).then(function(data) {
                // console.log("Data Stored: ", data);
                
                var sendObject ={
                    id: topicId,
                    topic_votes: totalVote
                };

                // Update topics total vote
                $.ajax({
                    url: "/api/topics/total/votes",
                    type: "PUT",
                    data: sendObject
                }).then(function(data) {
                    // console.log("Data Stored: ", data);    
                    location.reload();
                });
            });
        });
    });
}; 


// Post Interest Vote
function interestVote(interest_state, topic_id){

    // Store The state of the vote for topic selected 
    var interestState = interest_state;
    var topicId = parseInt(topic_id);
    var userId = parseInt($("#user").data("data-id"), 10);

    // Pull total vote for this topic
    $.ajax({
        url: "/api/choices/totals/interest/"+topicId,
        type: "GET",
    }).then(function(data) {
        // console.log("Total Vote Data Stored: ", data[0].total_interests);
        var totalInterest = parseInt(data[0].total_interests);

        // Toggles vote state
        if(interestState === "true"){
            interestState = 0;
            totalInterest--;
        } else{
            interestState = 1;
            totalInterest++;
        };

        // Stores vote, user id, and topic id.  
        var userInterest = {
            user_id: userId,
            topic_id: topicId,
            interest_state: interestState
        };   
        // console.log("User Interest: ", userInterest);

         // Checks if IDs exists on Choices. 
        $.ajax({
            url: "/api/choices/check/"+userId+"/"+topicId,
            type: "GET",
        }).then(function(data) {
            // console.log("Check Exists: ", data);
            var updateType = "";
            
            // Set the type of AJAX on Choices
            if(data === true){
                updateType = "PUT"
            } else{
                updateType = "POST"
            };

            // Update choices table
            $.ajax({
                url: "/api/choices/updates/interest",
                type: updateType,
                data: userInterest
            }).then(function(data) {
                // console.log("Data Stored: ", data);
                
                var sendObject ={
                    id: topicId,
                    topic_interest: totalInterest
                };
                // console.log(sendObject);

                // Update topics total vote
                $.ajax({
                    url: "/api/topics/total/interest",
                    type: "PUT",
                    data: sendObject
                }).then(function(data) {
                    console.log("Data Stored: ", data);    
                    location.reload();
                });
            });
        });
    });
}; 



// Event Listeners
// =================================================================

$(".interest-btn").on("click", function(event){
    event.preventDefault();
    // console.log("got click");
    var interest_state = $(this).attr("interest-state");
    var topic_id = parseInt($(this).attr("topic-id"));
    interestVote(interest_state, topic_id);
});


$(".vote-btn").on("click", function(event){
    event.preventDefault();
    // console.log("got click");
    var vote_state = $(this).attr("vote-state");
    var topic_id = $(this).attr("topic-id");
    answerVote(vote_state, topic_id);
});

// must wait for user_data ajax query to return value
// before starting function loadChoices
$.get("/api/user_data").then(function(data) {
  loadChoices();
});

// Document Ready Close
});
