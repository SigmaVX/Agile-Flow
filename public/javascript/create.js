$("div")

function createClosedCards(){


// add loop and DB query
var data = [{
    title: "test title",
    topic_video: "https://youtu.be/qsDvJrGMSUY",
    vote: 3,
    id: 2
}];


// Modify YouTube URL
var rawURL = data[0].topic_video;
var spot = rawURL.lastIndexOf("/");
var cleanURL = rawURL.slice(spot);
console.log(cleanURL);


var newCard = $("<div>").attr("class","col-3 card");        
$("#closedCards").append(newCard);


        
    var newVideoWrap = $("<div>").attr("class", "embed-responsive embed-responsive-16by9");
    newCard.append(newVideoWrap);

        var newVideo = $("<iframe>").attr({
            src: "https://www.youtube.com/embed"+cleanURL,
            class: "card-img-top"
        });
        newVideoWrap.append(newVideo);

    var newBodyDiv = $("<div>").attr("class","card-body");  
    newCard.append(newBodyDiv);
    

    var newTitle= $("<div>").html("Test Title");
    newTitle.attr("class", "col-12 card-topic-title card-title text-center");
    newBodyDiv.append(newTitle);

    var newVote= $("<div>").html("5");
    newVote.attr("class", "col-12 card-topic-vote");
    newBodyDiv.append(newVote);

}

// createClosedCards();