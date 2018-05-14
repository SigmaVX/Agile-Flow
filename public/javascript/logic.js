$(document).ready(function() {


// Create A Topic - For Admin
function createTopic(){

    var userId = $("#user").data("user-id");
    var topicTitle = $("#add_topic_title").val().trim();
    var topicBody = $("#add_topic_body").val().trim();
    var titleLength = topicTitle.length;
    var bodyLength = topicBody.length;

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
    };
};


// Fill Values In Edit Modal - For Admin
function fillEditModal(topicID){

    $.ajax({
        url: "/api/topics/"+topicID,
        type: "GET"
    }).then(function(data) {
        console.log("Data Stored: ", data);
        console.log("data ", data[0].topic_title);
        $("input[id='topic_title']").val(data[0].topic_title);
        $("textarea[id='topic_body']").val(data[0].topic_body);
        $("textarea[id='topic_answer']").val(data[0].topic_answer);
        $("input[id='topic_video']").val(data[0].topic_video);
        $("input[id='topic_answer_url']").val(data[0].topic_answer_url);
        $("#update-topic-btn").attr("data-id", topicID);
    });
    $("#editModal").modal("show");
};


// Update Any Topic - For Admin
function editAnyTopic(){

    // Grab Info
    var userId = $("#user").data("user-id");
    var topicID = $("#update-topic-btn").attr("data-id");
    var topicTitle = $("input[id='topic_title']").val().trim();
    var topicBody = $("textarea[id='topic_body']").val().trim();
    var topicAnswer = $("textarea[id='topic_answer']").val().trim();
    var topicVideo = $("input[id='topic_video']").val().trim();
    var topicAnswerUrl = $("input[id='topic_answer_url']").val().trim();
    
    console.log(topicTitle);

    // Validation
    var titleLength = topicTitle.length;
    var bodyLength = topicBody.lenght;

    if(topicTitle === "" || topicBody === "" || titleLength > 100 || bodyLength > 280){
        
        $("#error-txt").text("Error: Please Check Your Title And Description");
        return;

    } else {

        var newTopicData = {
            id: topicID,
            topic_title: topicTitle,
            topic_body: topicBody,
            topic_answer: topicAnswer,
            topic_video: topicVideo,
            topic_answer_url: topicAnswerUrl
        };

        console.log(topicID);

        $.ajax({
            url: "/api/topics",
            type: "PUT",
            data: newTopicData
        }).then(function(data) {
            // console.log("Data Stored: ", data);
            location.reload();
        });    
    };
};


// Update Open Topic - For User
function editOpenTopic(){

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


// Delete Topic
function deleteTopic(topicID){

    // var topicId = $(this).attr("id");
    // console.log(topicId);

    $.ajax({
        url: "/api/topics/"+topicID,
        type: "DELETE",
    }).then(function(data) {
        console.log("Data Stored: ", data);
        location.reload();
    });
};


// Post An Answer To Pending
function postAnswer(){

    var topicId = $("#user-topic").data("topic-id");
    var answer =  $("#topic_answer").val().trim();
    var answerURL = $("#topic_answer_url").val().trim();
    var answerVideo = $("#topic_video").val().trim();
    var youTubeCheck = answerVideo.includes("https://youtu.be/");

    if(answer !== "" && answerVideo !== "" && youTubeCheck === true){
        
        // Modify YouTube URL
        var rawURL = data[0].topic_video;
        var spot = rawURL.lastIndexOf("/");
        var cleanURL = rawURL.slice(spot);
        var fixedURL = "https://www.youtube.com/embed"+cleanURL;
        // console.log(cleanURL);


        var topicData = {    
            topic_answer: answer,
            topic_answer_url: fixedURL,
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
    
};





// Event Listeners
// ====================================================================

$("#answer-topic-btn").on("click", function(event){
    event.preventDefault();
    postAnswer();
});

// Add New Topic - Admin Page
$("#add-topic-btn").on("click", function(event){
    event.preventDefault();
    createTopic();
});

// Open Edit Topic Modal & Get Data
$(".admin-edit-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("id");
    fillEditModal(topicID);
});

// Update Topic - Edit Event Model
$("#update-topic-btn").on("click", function(event){
    event.preventDefault();
    editAnyTopic();
});

// Delete Topic
$(".admin-delete-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("id");
    deleteTopic(topicID);
});


// End For Document Ready Function
});