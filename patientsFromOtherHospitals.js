
import { Patient } from "./patient.js";



export function patientsFromOtherHospitals() {

    // information related to the patients from another hospital 
    let data = [{
        firstName: 'alex',
        lastName: 'robart',
        assignedDoctorID: 8,
        patientType: 'inpatient',
        admitted: true,
        diseases: ['kidny cancer'],
        requires: ['kidny'],
        donors: []
    },
    {
        firstName: 'max',
        lastName: 'rubart',
        assignedDoctorID: 6,
        patientType: 'patient',
        admitted: false,
        diseases: [],
        requires: [],
        donors: ['kidny']

    },

    {
        firstName: 'peter',
        lastName: 'grifin',
        assignedDoctorID: 7,
        patientType: 'patient',
        admitted: false,
        diseases: ['pneumonia'],
        requires: [],
        donors: ['kidny']

    },

    ];

    const patient = new Patient();

    
    const maxpatientIdx = patient.getmaxIndex()+1;

    patient.addData(data.map((p,idx )=> { 
        return { ...p, id: maxpatientIdx+idx, admitted: true} 
    }));




    return patient;

}



const pfh=patientsFromOtherHospitals();
console.log('show old and new patient ');
console.log(pfh.listOfPatient());