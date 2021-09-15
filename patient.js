
export  function Patient(){
      let data=[{
        firstName:'tumzied',
        lastName:'Abdur rahman',
        id:5,
        assignedDoctorID:5,
        patientType:'inpatient',
        admitted:true,
        diseases:['COVID'],
        requires:[],
        donors:['kidny']
    },
    {
        firstName:'',
        lastName:'',
        id:2,
        assignedDoctorID:1,
        patientType:'patient',
        admitted:false,
        diseases:[],
        requires:['kidny'],
        donors:[]

    },
    

];

    /**
     * 
     * list of patients sort by there ID
     */
    this.listOfPatient=()=>{
        return [...data.sort((p1,p2)=>p1.id<p2.id?-1:1)]
    }

    
    /**
     * 
     * @returns list of patient who is not admitted, also admitted tham,
     * 
     */
    this.listofNotAddmittedPatient=()=>{



        return  data.filter((patient,idx)=>{

            let setAdmitted=true;
                                                    //  get patient admitted.
            setAdmitted=patient.admitted===false?data[idx]={... data[idx],admitted:true }:false;
            return setAdmitted;
                
        
        });
   
    }
   
    /**
    * 
    * @returns list of patient who required kidny
    * 
    */
    this.listOfPatientRequireKidnys=()=>{

        return data.filter((patient)=>{
            return patient.requires.find(r=>r=='kidny')!=undefined?true:false;
        });
    }

    // find the number of patients we need to finish the kidney stock


   
    /**
    * find those patients with COVID, and display their details
    * 
    */
    this.dispalyCovidPatient=()=>{

        data.forEach((patient)=>{
            let isCovidPatient= patient.diseases.find(r=>r=='COVID')!=undefined?true:false;
            isCovidPatient?console.log(`${patient.lastName},${patient.firstName} ${patient.diseases.length} ${patient.diseases.length>1?'disease':'diseases'}`):null
        })

    }
    /**
     * 
     * @param {Array} patientList 
     */
    this.addData=(patientList)=>{
        data=[...data,...patientList];
    }
    /**
     * 
     * @returns {number} : max patient Index Number
     */
    this.getmaxIndex=()=>{

        let maxidx=data[0].id;
        data.forEach(p=>{

            maxidx=maxidx<p.id?p.id:maxidx;
        });
        return maxidx
    }




  
    

   

}


// patients
console.log('**************patient part*******************');
const p = new Patient();
console.log('list of all the patient');

console.log(p.listOfPatient())

console.log('list of Not Addmitted Patient');
console.log(p.listofNotAddmittedPatient())

console.log('list Of Patient Require Kidnys');
console.log(p.listOfPatientRequireKidnys())
console.log('dispaly Covid Patient');
p.dispalyCovidPatient();

console.log('**************patient part end*******************');
