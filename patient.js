const kidneysInStock = 5

 export default function Patient(){
      let data=[
        {
          firstName: "Shakira",
          lastName: "Hossain",
          patientID: "007",
          diseases: ["COVID", "1-kidney", "3/4-dissolved-brain"],
          isAdmitted: true,
        },
        {
          firstName: "Uzumaki",
          lastName: "Naruto",
          patientID: "008",
          diseases: ["Obesity"],
          isAdmitted: true,
        },
        {
          firstName: "Sheikh",
          lastName: "Selim Ahmed",
          patientID: "006",
          diseases: ["Broken heart", "Depression"],
          isAdmitted: true,
        },
        {
          firstName: "Rafsan",
          lastName: "Wayne",
          patientID: "009",
          diseases: ["COVID", "1-kidney", "Impaired vision"],
          isAdmitted: false,
        },
      ];

    /**
     * 
     * list of patients sort by there ID
     */
    this.listOfPatient=()=>{
        return [...data.sort((p1,p2)=>p1.patientID<p2.patientID?-1:1)]
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
            setAdmitted=patient.isAdmitted===false?data[idx]={... data[idx],isAdmitted:true }:false;
            return setAdmitted;
                
        
        });
   
    }
   
    /**
    * 
    * @returns {Array} : list of patient who required kidny
    * 
    */
    this.listOfPatientRequireKidnys=()=>{

        return data.filter((patient)=>{
            return patient.diseases.find(disease=>{
                //return only matched world or null 
                return disease.match(/(kidney)/g)!=null?true:false;
            
            })!=undefined?true:false;
        });
    }

    // find the number of patients we need to finish the kidney stock

    this.numberOfPatientToFinishKidneyStock=()=>{

        return kidneysInStock-this.listOfPatientRequireKidnys().length

    }


   
    /**
    * find those patients with COVID, and display their details
    * 
    */
    this.dispalyCovidPatient=()=>{

        data.forEach((patient)=>{
            let isCovidPatient= patient.diseases.find(disease=>disease=='COVID')!=undefined?true:false;
            isCovidPatient?console.log(`${patient.lastName},${patient.firstName} ${patient.diseases.length} ${patient.diseases.length>1?'disease':'diseases'}`):null
        })

    }
    /**
     * 
     * @param {Array} patientList 
     */
    this.addData=(patientList)=>{

        let maxpatientIdx=this.getmaxIndex()+1;

        // 
        data=[...data,...patientList.map((p,idx)=>{
            return { ...p, patientID:(new Array(3).join('0') + (maxpatientIdx + idx )).substr(-3), isAdmitted: true} 

        })];
    }
    /**
     * 
     * @returns {number} : max patient Index Number
     */
    this.getmaxIndex=()=>{

        let maxidx=parseInt(data[0].patientID);
        data.forEach(p=>{

            maxidx=maxidx<parseInt(p.patientID)?parseInt(p.patientID):maxidx;
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
console.log('number Of Patient To Finish Kidney Stock');
console.log(   p.numberOfPatientToFinishKidneyStock())

console.log('list Of Patient Require Kidnys');
console.log(p.listOfPatientRequireKidnys())
console.log('dispaly Covid Patient');
p.dispalyCovidPatient();

console.log('**************patient part end*******************');
