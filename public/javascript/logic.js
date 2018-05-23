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
function fillEditModalAdmin(topicID){

    $.ajax({
        url: "/api/topics/one/"+topicID,
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


// Fill Values In Edit Modal - For User
function fillEditModalUser(topicID){

    $.ajax({
        url: "/api/topics/one/"+topicID,
        type: "GET"
    }).then(function(data) {
        console.log("Data Stored: ", data);
        console.log("data ", data[0].topic_title);
        $("input[id='topic_title']").val(data[0].topic_title);
        $("textarea[id='topic_body']").val(data[0].topic_body);
        $("#update-open-topic-btn").attr("data-id", topicID);
    });
    $("#userEditModal").modal("show");
};


// Update Any Topic - For Admin
function editAnyTopic(topicID){

    // Grab Info
    var userId = $("#user").data("user-id");
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
            // location.reload();
        });    
    };
};


// Update Open Topic - For User
function editOpenTopic(){
    
    var userId = $("#user").attr("data-id");
    var topicID = $("#update-open-topic-btn").attr("data-id");
    
    var topicTitle = $("input[id='topic_title']").val().trim();
    var topicBody = $("textarea[id='topic_body']").val().trim();
    var titleLength = topicTitle.length;
    var bodyLength = topicBody.length;
    console.log("Topic Body and Title:" ,bodyLength, titleLength, userId);

    if(topicTitle !== "" && topicBody !== "" && titleLength < 101 && bodyLength < 281){

        var newTopic = {
            topic_title: topicTitle,
            topic_body: topicBody,
            id: topicID
        };

        // console.log(newTopic);
        $.ajax({
            url: "/api/topics/open",
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
    $.ajax({
        url: "/api/topics/"+topicID,
        type: "DELETE",
    }).then(function(data) {
        console.log("Data Stored: ", data);
        location.reload();
    });        
};

// Claim An Open Topic
function claimTopic(topicID){

    var userId = $("#user").data("user-id");

    var newTopic = {
        topic_assigned_to: userId,
        topic_state: "pending",
        id: topicID
    };

    console.log(newTopic);

    $.ajax({
        url: "/api/topics/status/"+topicID,
        type: "PUT",
        data: newTopic
    }).then(function(data) {
        console.log("Data Stored: ", data);
        location.reload();
    });
};



// Post An Answer To Pending
function postAnswer(topicID){

    console.log("Click Test ID: ", topicID);

    var answer = $("#topic_answer").val().trim();
    var answerURL = $("#topic_answer_url").val().trim();
    var answerVideo = $("#topic_video").val().trim();
    var youTubeCheck = answerVideo.includes("https://youtu.be/");

    if(answer !== "" && answerVideo !== "" && youTubeCheck === true){
        
        // Modify YouTube URL
        // var rawURL = data[0].topic_video;
        var rawURL = answerVideo;
        var spot = rawURL.lastIndexOf("/");
        var cleanURL = rawURL.slice(spot);
        var fixedURL = "https://www.youtube.com/embed"+cleanURL;
        console.log(cleanURL);


        var topicData = {    
            topic_answer: answer,
            topic_answer_url: answerURL,
            topic_video: fixedURL,
            topic_state: "closed",
            id: topicID
        };

        console.log(topicData);

        $.ajax({
            url: "/api/topics/status/"+topicID,
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
function removeTopic(topicID){
    
    var userCancels = {
        topic_state: "open",
        topic_assigned_to: null,
        id: topicID 
    };

    $.ajax({
        url: "/api/topics/status/"+topicID,
        type: "PUT",
        data: userCancels
    }).then(function(data) {
        console.log("Data Stored: ", data);
        location.reload();
    });
};
    

// Event Listeners
// ====================================================================

// Sidebar collapse functionality
$('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
});

// Post A Question - Show Modal
$("#post-link").on("click", function(event){
    event.preventDefault();
    console.log("click test");
    $("#postModal").modal("show");
});

// Add New Topic - Admin & User Page
$(".add-topic").on("click", function(event){
    event.preventDefault();
    createTopic();
});

//  Claim An Open Topic
$(".claim-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("topic-id");
    console.log("test", topicID);
    claimTopic(topicID);
});

// Show Post Answer Modal & Save ID
$(".answer-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("topic-id");
    $("#update-btn").attr("topic-id", topicID);
    $("#answerModal").modal("show");
});

// Remove A Claimed Topic 
$(".remove-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("topic-id");
    removeTopic(topicID);
});

// Post Answer From Modal
$("#update-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("topic-id");
    postAnswer(topicID);
});

// Open Edit Topic Modal & Get Data - Admin
$(".admin-edit-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("topic-id");
    fillEditModalAdmin(topicID);
});

// Open Edit Topic Modal & Get Data - User
$(".user-edit-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("topic-id");
    fillEditModalUser(topicID);
});

// Update Topic - Edit Event Model - Admin
$("#update-topic-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("data-id");
    editAnyTopic(topicID);
});

// Update Topic - Edit Event Model - User
$("#update-open-topic-btn").on("click", function(event){
    event.preventDefault();
    console.log("event list");
    editOpenTopic();
});

// Delete Topic Warning
$(".admin-delete-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("topic-id");
    $(".confirm-delete-btn").attr("topic-id", topicID);    
    $("#confirmModal").modal("show");
});

// Delete Topic
$(".confirm-delete-btn").on("click", function(event){
    event.preventDefault();
    var topicID = $(this).attr("topic-id");
    console.log("ID Stored:" ,topicID); 
    deleteTopic(topicID);
});


// Run On Page Load
// ====================================================================
    
// Hide Claim Button ON Pending Topics
    function hideClaim(){
        $("[status=pending]").hide();  
    };

    hideClaim();



// End For Document Ready Function
});



// check claim open topic and remove pending