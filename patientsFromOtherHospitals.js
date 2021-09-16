
import Patient from "./patient.js";



export function patientsFromOtherHospitals() {

    // information related to the patients from another hospital 
    const patientsFromOtherHospitalData = [
        {
          firstName: "Agent",
          lastName: "Pena",
          diseases: ["COVID"],
        },
        {
          firstName: "Heisenberg",
          lastName: "Bear",
          diseases: ["Headache"]
        },
        {
          firstName: "Okarin",
          lastName: "May",
          diseases: ["Broken Wrist", "Mad-scientist"],
        },
        {
          firstName: "Hououin",
          lastName: "Kyoma",
          diseases: ["Delusional disorder", "Memory loss"],
        },
      ];

    const patient = new Patient();



    patient.addData([...patientsFromOtherHospitalData]);




    return patient;

}



const pfh=patientsFromOtherHospitals();
console.log('show old and new patient ');
console.log(pfh.listOfPatient());
