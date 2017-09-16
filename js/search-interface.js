import {doctorLogic} from './../js/search.js';

$(document).ready(function(){

// ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ //

function doctorSpread(doctor1) {
  doctor1.forEach(function(doctor) {
   $('#result1').append(`<br><b>Phone Number:</b> ${doctor.phone}`);
   $('#result1').append(`<br>${doctor.firstName} ${doctor.lastName}`);
   $('#result1').append(`<br>${doctor.street} `);
   $('#result1').append(`<br>${doctor.city} ${doctor.state} ${doctor.zip}`);
   $('#result1').append(`<b><br>Open for new Patients:</b> ${doctor.newPatient}<br><hr noshade>`);
 });
}

$('#illnessSearch').submit(function(e) {
  e.preventDefault();
  let sickness = $("input[name = 'illnessSearch']").val();
  $("input").val("");
  doctorLogic.docByIllness(sickness, doctorSpread);
});

$('#doctorSearch').submit(function(e) {
  e.preventDefault();
  let physician = $("input[name = 'doctorSearch']").val();
  $("input").val("");
  doctorLogic.docByName(physician, doctorSpread);
});

});
