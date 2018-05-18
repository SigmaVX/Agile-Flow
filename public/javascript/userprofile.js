// User profile JS (Pushes HTML content into body)
function myFunction() {
  document.getElementById("demo").innerHTML = "Paragraph changed!";
}

$('#profileSettings').click(function(){
  myName = $('#nameId').val();
  $('#profileContent').html(compiled({name:myName}));
});