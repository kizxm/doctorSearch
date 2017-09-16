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
        image: doctor1.profile.image_url,
        firstName: doctor1.profile.first_name,
        lastName: doctor1.profile.last_name,
        street: doctor1.practices[0].visit_address.street,
        city: doctor1.practices[0].visit_address.city,
        state: doctor1.practices[0].visit_address.state,
        zip: doctor1.practices[0].visit_address.zip,
        phone: doctor1.practices[0].phones[0].number,
        newPatient: doctor1.practices[0].accepts_new_patients
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

  docByName: function docByName(name, showDoctor) {
    var getDoctorApi2 = fetch('https://api.betterdoctor.com/2016-03-01/doctors?name=' + name + '&location=or-portland&limit=10&user_key=' + apiKey).then(function (res) {
      res.json().then(function (doctor) {
        console.log(doctor);
        doctor.apiData(doctor, showDoctor);
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
    doctor1.forEach(function (test) {
      $('#result1').append('<img src=' + doctor1.image_url + ' height="50" width="50"> ');
      $('#result1').append('<br><b>Phone Number:</b> ' + doctor1.phone);
      $('#result1').append('<hr noshade>');
      $('#result1').append('<br>' + doctor1.firstName + ' ' + doctor1.lastName);
      $('#result1').append('<br>' + doctor1.street + ' ');
      $('#result1').append('<br>' + doctor1.city + ' ' + doctor1.state + ' ' + doctor1.zip);
      $('#result1').append('<b><br>Open for new Patients:</b> ' + doctor1.acceptingPatients);
    });
  }

  $('#illnessSearch').submit(function (e) {
    e.preventDefault();
    var illness = $("input[name = 'illnessSearch']").val();
    $("input").val("");
    _search.doctorLogic.docByIllness(illness, doctorSpread);
  });

  $('#doctorSearch').submit(function (e) {
    e.preventDefault();
    var physician = $("input[name = 'doctorSearch']").val();
    $("input").val("");
    _search.doctorLogic.docByName(physician, doctorSpread);
  });
});

},{"./../js/search.js":2}]},{},[3]);
