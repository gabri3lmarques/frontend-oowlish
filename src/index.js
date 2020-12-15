import "./index.css";

let doctors = [];
const doctorsList = document.getElementById("doctors");
const filterInput = document.getElementById("availabilityFilterSelect");

const localtion = [
  {"zip": 92037, "city": "La Jolla"},
  {"zip": 92037, "city": "La Jolla"},
  {"zip": 92015, "city": "San Diego"},
  {"zip": 92015, "city": "San Diego"},
  {"zip": 92015, "city": "San Diego"},
  {"zip": 92015, "city": "San Diego"},
  {"zip": 92037, "city": "La Jolla"},
  {"zip": 92015, "city": "San Diego"}
]

function listDoctors(arr){
  arr.forEach(doctor => {
    doctorsList.insertAdjacentHTML("beforeend", `
    <tr data-upin="${doctor.upin}">
      <td>${doctor.name}</td>
      <td>${doctor.zip}</td>
      <td>${doctor.city}</td>
      <td><button data-class="${doctor.available}" class="button button-outline">Mark as ${doctor.available ? "Available": "Unavailable"}</button></td>
    </tr>
    `);
  });
}

function fetchDoctors(){
  fetch('http://localhost:3000/doctors')
  .then(data => data.json())
  .then(data => {
    doctors = data;
    doctors.forEach((element, index) => {
      element.zip = localtion[index].zip;
      element.city = localtion[index].city;
    });
    doctorsList.innerHTML = "";
    if(filterInput.value == "available"){
      const availableDocters = doctors.filter(doctor => doctor.available == true);
      listDoctors(availableDocters)
    }
    else {
      listDoctors(doctors);
    }
  })
}

filterInput.addEventListener("change", () => {
  if(filterInput.value == "all") {
    doctorsList.innerHTML = "";
    listDoctors(doctors);
  }
  else if(filterInput.value == "available"){
    const filteredDocs = doctors.filter(doctor => doctor.available == true);
    doctorsList.innerHTML = "";
    listDoctors(filteredDocs);
  }
});

document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("searchContainer").innerHTML = '<input placeholder="Name or upin..." type="text" id="searchField">';
  const searchWord = document.getElementById("searchField");
  window.onkeydown = () => {
    if(filterInput.value == "all") {
      const availableDocters = doctors.filter(doctor => doctor.name.toLowerCase().includes(searchWord.value) || doctor.upin.toString().includes(searchWord.value));
      doctorsList.innerHTML = "";
      listDoctors(availableDocters);
    }
    else if(filterInput.value == "available"){
      const availableDocters = doctors.filter(doctor => doctor.available == true);
      const filteredByName = availableDocters.filter(doctor => doctor.name.toLowerCase().includes(searchWord.value)|| doctor.upin.toString().includes(searchWord.value));
      doctorsList.innerHTML = "";
      listDoctors(filteredByName);
    }
  }
  window.onkeyup = () => {
    if(filterInput.value == "all") {
      const availableDocters = doctors.filter(doctor => doctor.name.toLowerCase().includes(searchWord.value)|| doctor.upin.toString().includes(searchWord.value));
      doctorsList.innerHTML = "";
      listDoctors(availableDocters);
    }
    else if(filterInput.value == "available"){
      const availableDocters = doctors.filter(doctor => doctor.available == true);
      const filteredByName = availableDocters.filter(doctor => doctor.name.toLowerCase().includes(searchWord.value)|| doctor.upin.toString().includes(searchWord.value));
      doctorsList.innerHTML = "";
      listDoctors(filteredByName);
    }
  }
});

fetchDoctors();








