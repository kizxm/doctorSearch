(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "fce00122dfebcf1df1a46ce77b585f46";

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apiKey = require('./../.env').apiKey;
var doctorLogic = exports.doctorLogic = {

  // ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ //

  apiData: function apiData(doctor, showDoctor) {
    var doctor1 = [];
    doctor.data.forEach(function (doctor) {
      doctor1.push({
        firstName: doctor.profile.first_name,
        lastName: doctor.profile.last_name,
        street: doctor.practices[0].visit_address.street,
        city: doctor.practices[0].visit_address.city,
        state: doctor.practices[0].visit_address.state,
        zip: doctor.practices[0].visit_address.zip,
        phone: doctor.practices[0].phones[0].number,
        newPatient: doctor.practices[0].accepts_new_patients
      });
    });
    showDoctor(doctor1);
  },

  docByIllness: function docByIllness(sickness, showDoctor) {
    var getDoctorApi = fetch('https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&user_key=' + apiKey + '&limit=2&query=' + sickness).then(function (res) {
      res.json().then(function (doctor) {
        doctorLogic.apiData(doctor, showDoctor);
      });
    }).catch(function (error) {
      console.log(error);
    });
  },

  docByName: function docByName(physician, showDoctor) {
    var getDoctorApi2 = fetch('https://api.betterdoctor.com/2016-03-01/doctors?name=' + physician + '&location=or-portland&limit=10&user_key=' + apiKey).then(function (res) {
      res.json().then(function (doctor) {
        console.log(doctor);
        doctorLogic.apiData(doctor, showDoctor);
      });
    }).catch(function (error) {
      console.log(error);
    });
  }
};

},{"./../.env":1}],3:[function(require,module,exports){
'use strict';

var _search = require('./../js/search.js');

$(document).ready(function () {

  // ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ //

  function doctorSpread(doctor1) {
    doctor1.forEach(function (doctor) {
      $('#result1').append('<b>Phone Number:</b> ' + doctor.phone);
      $('#result1').append('<br>' + doctor.firstName + ' ' + doctor.lastName);
      $('#result1').append('<br>' + doctor.street + ' ');
      $('#result1').append('<br>' + doctor.city + ' ' + doctor.state + ' ' + doctor.zip);
      $('#result1').append('<b><br>Open for new Patients:</b> ' + doctor.newPatient);
    });
  }

  $('#illnessSearch').submit(function (e) {
    e.preventDefault();
    var sickness = $("input[name = 'illnessSearch']").val();
    $("input").val("");
    _search.doctorLogic.docByIllness(sickness, doctorSpread);
  });

  $('#doctorSearch').submit(function (e) {
    e.preventDefault();
    var physician = $("input[name = 'doctorSearch']").val();
    $("input").val("");
    _search.doctorLogic.docByName(physician, doctorSpread);
  });
});

},{"./../js/search.js":2}]},{},[3]);
