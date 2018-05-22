// User profile JS (Pushes HTML content into body)
// function myFunction() {
//   document.getElementById("demo").innerHTML = "Paragraph changed!";
// }

// $('#profileSettings').click(function(){
//   myName = $('#nameId').val();
//   $('#profileContent').html(compiled({name:myName}));
// });


// function myFunction() {
//     document.getElementById("panel").style.display = "block";
//     return;
// }

// function myFunction2() {
//     document.getElementById("panel2").style.display = "block";
//     return;
// }

$( "#section1" ).click(function() {
  document.getElementById("panel").style.display = "block";
  return
});

$( "#section2" ).click(function() {
  document.getElementById("panel2").style.display = "block";
  return
});

/*******************************
* ACCORDION WITH TOGGLE ICONS
*******************************/
function toggleIcon(e) {
  $(e.target)
      .prev('.panel-heading')
      .find(".more-less")
      .toggleClass('glyphicon-plus glyphicon-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);