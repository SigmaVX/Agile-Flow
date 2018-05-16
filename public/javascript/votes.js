$(document).ready(function() {

// Page load function
// on page load 
// query db for user
// loop through data
// update page where answers are only true
function loadChoices(){

    var userId = $("#user").attr("data-id");
    // console.log(userId);

    if(userId){

        $.ajax({
            url: "/api/interest/user/"+userId,
            type: "GET"
        }).then(function(data) {
        console.log("Interest Data:" , data);
            
            // Loop through choices data to change topics to true
            for (var i = 0; i < data.choices.length; i++){
                console.log("Topic Piced For Loop Test: ", data.choices[i].topic_id);
                $("#user-interest-"+data.choices[i].topic_id).text("I'm Interested");
                $("#interest-btn-"+data.choices[i].topic_id).attr("interest-state", "true");
            };  
            
            $.ajax({
                url: "/api/votes/user/"+userId,
                type: "GET"
            }).then(function(voteData) {
            console.log("Vote Data:" , voteData);
                
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



// update data on vote
// jq to look up vote state
// run if based on state
// send put ajax; increment total; update text; reload


// Post Answer Vote
function answerVote(vote_state, topic_id){

    // Store The state of the vote for topic selected 
    var voteState = vote_state;
    var topicId = topic_id;
    var userId = $("#user").attr("data-id");

    console.log(topicId, voteState, userId);

    // Pull total vote for this topic
    $.ajax({
        url: "/api/choices/totals/vote/"+topicId,
        type: "GET",
    }).then(function(data) {
        console.log("Total Vote Data Stored: ", data);
        var totalVote = data;

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

        // Update choices table
        $.ajax({
            url: "/api/choices/updates/vote",
            type: "PUT",
            data: userVote
        }).then(function(data) {
            console.log("Data Stored: ", data);
            
            var sendObject ={
                id: topicId,
                topic_vote: totalVote
            };

            // Update topics total vote
            $.ajax({
                url: "/api/topics",
                type: "PUT",
                data: sendObject
            }).then(function(data) {
                console.log("Data Stored: ", data);    
                // location.reload();
            });
        });
    });
} 


// Post Interest Vote
function interestVote(){

    // Store The state of the vote for topic selected 
    var interestState = $(this).attr("interest-state");
    
    // Toggles vote state
    if(interestState === true){
        interestState = false;
    } else{
        interestState = true;
    };

    // Stores vote, user id, and topic id.  
    // Assumes ids are stored in the data() method in DOM
    var userInterest = {
        user_id: $("#user").data("user-id"),
        topic_id: $(this).data("topic-id"),
        vote_state: interestState
    };   

    $.ajax({
        url: "/api/topics/interest",
        type: "PUT",
        data: userInterest
    }).then(function(data) {
        console.log("Data Stored: ", data);
        location.reload();
    });
    
};

// Event Listeners
// =================================================================

$(".interest-btn").on("click", function(event){
    event.preventDefault();
    console.log("got click");
    interestVote();
});


$(".vote-btn").on("click", function(event){
    event.preventDefault();
    console.log("got click");
    var vote_state = $(this).attr("vote-state");
    var topic_id = $(this).attr("topic-id");
    answerVote(vote_state, topic_id);
});


loadChoices();

// Document Ready Close
});
