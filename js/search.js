var apiKey = require('./../.env').apiKey;
export let doctorLogic = {

// ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ //

apiData: function(doctor, showDoctor) {
  let doctor1 = [];
  doctor.data.forEach(function(doctor) {
    doctor1.push(
      {
       image: doctor1.profile.image_url,
       firstName: doctor1.profile.first_name,
       lastName: doctor1.profile.last_name,
       street: doctor1.practices[0].visit_address.street,
       city: doctor1.practices[0].visit_address.city,
       state: doctor1.practices[0].visit_address.state,
       zip: doctor1.practices[0].visit_address.zip,
       phone: doctor1.practices[0].phones[0].number,
       newPatient: doctor1.practices[0].accepts_new_patients
      }
    );
  });
  showDoctor(doctor1);
},

docByIllness: function(sickness, showDoctor) {
  let getDoctorApi = fetch(`https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&user_key=${apiKey}&limit=2&query=${sickness}`)
  .then((res) => {
    res.json().then((doctor) => {
      doctorLogic.apiData(doctor, showDoctor);
  });
})
.catch((error) => {
  console.log(error);
});
},

docByName: function(name, showDoctor) {
  let getDoctorApi2 = fetch(`https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=or-portland&limit=10&user_key=${apiKey}`)
  .then((res) => {
    res.json().then((doctor) => {
      console.log(doctor);
      doctorLogic.apiData(doctor, showDoctor);
    });
})
  .catch((error) => {
    console.log(error);
  });
}
};
