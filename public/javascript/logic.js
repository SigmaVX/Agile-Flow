








// Post Answer (AJAX Update)
function postAnswer(){

    var answer =  $("#topic_answer").val().trim();
    var answerURL = $("#topic_answer_url").val().trim();
    var answerVideo = $("#topic_video").val().trim();
    var youTubeCheck = answerURL.includes("https://youtu.be/");


    if(answer !== "" && answerVideo !== "" && youTubeCheck === true){
        
        var topicData = {    
            topic_answer: answer,
            topic_answer_url: answerURL,
            topic_video: answerVideo
        };

        $.ajax({
            url: "/api/topics",
            type: "PUT",
            data: topicData
        }).then(function(data) {
            console.log("Data Stored: ", data);
            location.reload();
        });

    } else {
        $("#errorModal").modal("show");
    }   
};
    
// Post Answer Vote
function answerVote(){
    var userVoteStatus = $("") 



} 


// Post Interest Vote



// Post Topic Answer


// Post For Cancel Answer




// Create Topic For Admin

// Update Topic For Admin

// Delete Topic For Admin





// Event Listener For Interest Vote


// Event Listener For Answer Vote