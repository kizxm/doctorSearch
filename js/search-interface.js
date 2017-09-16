import {doctorLogic} from './../js/search.js';

$(document).ready(function(){

// ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ //

function doctorSpread(doctor1) {
  doctor1.forEach(function(test) {
   $('#result1').append(`<img src=${doctor1.image_url} height="50" width="50"> `);
   $('#result1').append(`<br><b>Phone Number:</b> ${doctor1.phone}`);
   $('#result1').append(`<hr noshade>`);
   $('#result1').append(`<br>${doctor1.firstName} ${doctor1.lastName}`);
   $('#result1').append(`<br>${doctor1.street} `);
   $('#result1').append(`<br>${doctor1.city} ${doctor1.state} ${doctor1.zip}`);
   $('#result1').append(`<b><br>Open for new Patients:</b> ${doctor1.acceptingPatients}`);
 });
}

$('#illnessSearch').submit(function(e) {
  e.preventDefault();
  let illness = $("input[name = 'illnessSearch']").val();
  $("input").val("");
  doctorLogic.docByIllness(illness, doctorSpread);
});

$('#doctorSearch').submit(function(e) {
  e.preventDefault();
  let physician = $("input[name = 'doctorSearch']").val();
  $("input").val("");
  doctorLogic.docByName(physician, doctorSpread);
});

});
