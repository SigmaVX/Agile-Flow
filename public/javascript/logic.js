$(document).ready(function() {


// ===================================================================== 
// These four lines here are just until we build a front end.  it mimics the process of storing data with 
// the data method, which what we should use when we build out our DOM with jQuery. 
$("#user").data("user-id", 1);
$("#user-topic").data("topic-id", 3);
console.log("user id: ", $("#user").data("user-id"));
console.log("topic id: ", $("#user-topic").data("topic-id"));

// =====================================================================



// Create A Topic - For Admin Users
function createTopic(){

    var userId = $("#user").data("user-id");
    var topicTitle = $("#topic_title").val().trim();
    var topicBody = $("#topic_body").val().trim();
    var titleLength = topicTitle.length;
    var bodyLength = topicBody.lenght;

    if(topicTitle !== "" && topicBody !== "" && titleLength < 101 && bodyLength < 281){

        var newTopic = {
            topic_title: topicTitle,
            topic_body: topicBody,
            topic_created_by: userId
        };

        $.ajax({
            url: "/api/topics",
            type: "POST",
            data: newTopic
        }).then(function(data) {
            console.log("Data Stored: ", data);
            location.reload();
        });

    } else {
        $("#errorModal").modal("show");
        $("#modal-title").text("Please Check Your Title And Description");
        $("#modal-body").text("A title and description are required and must be less than 100 and 280 characters, respectively.");
    }

}

// Update Topic For Admin
function editTopic(){

    var userId = $("#user").data("user-id");
    var topicTitle = $("#topic_title").val().trim();
    var topicBody = $("#topic_body").val().trim();
    var titleLength = topicTitle.length;
    var bodyLength = topicBody.lenght;

    if(topicTitle !== "" && topicBody !== "" && titleLength < 101 && bodyLength < 281){

        var newTopic = {
            topic_title: topicTitle,
            topic_body: topicBody,
            topic_created_by: userId
        };

        $.ajax({
            url: "/api/topics",
            type: "PUT",
            data: newTopic
        }).then(function(data) {
            console.log("Data Stored: ", data);
            location.reload();
        });

    } else {
        $("#errorModal").modal("show");
        $("#modal-title").text("Please Check Your Title And Description");
        $("#modal-body").text("A title and description are required and must be less than 100 and 280 characters, respectively.");
    }

}

// Delete Topic For Admin

    // Assumes admin will have someting on each card they can click to delete
    var topicId = $(this).data("topic-id");

    $.ajax({
        url: "/api/topics/"+topicId,
        type: "DELETE",
    }).then(function(data) {
        console.log("Data Stored: ", data);
        location.reload();
    });    

// Post An Answer To Pending
function postAnswer(){

    var topicId = $("#user-topic").data("topic-id");
    var answer =  $("#topic_answer").val().trim();
    var answerURL = $("#topic_answer_url").val().trim();
    var answerVideo = $("#topic_video").val().trim();
    var youTubeCheck = answerURL.includes("https://youtu.be/");

    if(answer !== "" && answerVideo !== "" && youTubeCheck === true){
        
        var topicData = {    
            topic_answer: answer,
            topic_answer_url: answerURL,
            topic_video: answerVideo,
            topic_state: "Closed"
        };

        $.ajax({
            url: "/api/topics/"+topicId,
            type: "PUT",
            data: topicData
        }).then(function(data) {
            console.log("Data Stored: ", data);
            location.reload();
        });

    } else {
        $("#errorModal").modal("show");
        $("#modal-title").text("You Are Missing Some Info");
        $("#modal-body").text("Please be sure to enter a short description for your answer and a valid YouTube URL (example: https://youtu.be/abc123).");
    }   
};

// Cancel A Pending Answer
function cancelPending(){

    // This assumes the user has their pending topic saved to the DOM with a user-topic ID
    // Assumes we will use the data method to store user id and topic-id
    var topicId = $("#user-topic").data("topic-id");
    var userId = $("#user").data("user-id");
    
    var userCancels = {
        topic_state: "Open",
        topic_assigned_to: null 
    };

    $.ajax({
        url: "/api/topics/"+topicId+"/"+userId,
        type: "PUT",
        data: userCancel
    }).then(function(data) {
        console.log("Data Stored: ", data);
        location.reload();
    });

}
    
// Post Answer Vote
function answerVote(){

    // Store The state of the vote for topic selected 
    var voteState = $(this).attr("vote-state");
    
    // Toggles vote state
    if(voteState === true){
        voteState = false;
    } else{
        voteState = true;
    };

    // Stores vote, user id, and topic id.  
    // Assumes ids are stored in the data() method in DOM
    var userVote = {
        user_id: $("#user").data("user-id"),
        topic_id: $(this).data("topic-id"),
        vote_state: voteState
    };   

    $.ajax({
        url: "/api/topics/vote",
        type: "PUT",
        data: userVote
    }).then(function(data) {
        console.log("Data Stored: ", data);
        location.reload();
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
    
} 


// Event Listeners
// ====================================================================

$("#answer-topic-btn").on("click", function(event){
    event.preventDefault();
    function postAnswer();
});


$("#add-topic-btn").on("click", function(event){
    event.preventDefault();
    function createTopic();
})




// End For Document Ready Function
});