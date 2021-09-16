

export function Doctor() {

    const doctors = [
        {
            doctorID: "6215",
            firstName: "Jalaluddin",
            lastName: "Mahbub",
            teamID: "008",
            doctorType: "Consultant",
            email: "jabub@hospital.com",
            active: true,
            doctorRequests: []
        },
        {
            doctorID: "6216",
            firstName: "Amin",
            lastName: "Morshed",
            teamID: "008",
            doctorType: "Assistant Consultant",
            email: "amhed@hospital.com",
            active: true
        },
        {
            doctorID: "6214",
            firstName: "Mahady",
            lastName: "Selim",
            teamID: "005",
            doctorType: "Consultant",
            email: "malim@hospital.com",
            active: true,
            doctorRequests: ["6213", ]
        },
        {
            doctorID: "6213",
            firstName: "Jamela",
            lastName: "Begum",
            teamID: "005",
            doctorType: "RMO",
            email: "jagum@hospital.com",
            active: false
        },
    
    ];

    const team = [
        {
            teamName: "nephrology",
            teamID: "008",
            consultantInCharge: "6215",
            teamMates: ["6216",]
        },
        {
            teamName: "cardiology",
            teamID: "005",
            consultantInCharge: "6214",
            teamMates: []
        },
    ]

    let lastDoctorID = -1;
   




    /**
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} doctorType
     * @returns {number} doctorID:  of newdly added doctor to doctorRequests list 
     */
    this.addDoctor = (firstName, lastName, doctorType) => {
        // get last max id from the doctor 
        if(lastDoctorID===-1){
            let maxID=0;
            doctors.map((d=>{

                maxID<parseInt(d.doctorID)?
                    maxID=parseInt(d.doctorID):null;
                
                
            }));
            lastDoctorID=maxID;
           
        }
        


        let email = firstName.slice(0, 2) + lastName.slice(-4, -1) + "@hospital.com";
        
        let doctorID = (new Array(4).join('0') + (lastDoctorID + 1)).substr(-4); //substring from last 4 digit 
        const doc = {
            doctorID,
            firstName,
            lastName,
            email,
            active: false,
            teamID:'',
            doctorType,
        }
        doctorType==='Consultant'?doc['doctorRequests']=[]:null;

        lastDoctorID += 1;

        doctors.push(doc);
        return doctorID;

    }

    /**
     * @param {number} doctorID : doctorID
     * @param {string} teamID : team name
     * @param {object} currentActingDoctor : team name
     */
    this.addTeam = (doctorID, teamID,currentActingDoctor) => {

        if(currentActingDoctor.doctorType!=='Consultant'){return;}
        
        let idx = doctors.findIndex((doc) => doc.doctorID === doctorID);
        let ConsultantDocIdx = doctors.findIndex((doc) => doc.doctorID === currentActingDoctor.doctorID);
        if (ConsultantDocIdx!==-1 && idx !== -1) {

            doctors[idx] = { ...doctors[idx], teamID };

            // adding the new doctor to Consultant Doc `doctorRequests` field 
            doctors[ConsultantDocIdx].doctorRequests=[...doctors[ConsultantDocIdx].doctorRequests,doctors[idx].doctorID];

        }

    }
    this.listOfDoctor = () => [...doctors];
    // this.listOfDoctorRequests=()=>[...doctorRequests];

    this.listOfTeams = () => [...team];

    

    /**
     * @param {Object}: 
     * @returns {Array}: DoctorRequested list
     * 
    */
    this.promoteNewDoctor = (currentActingDoctor) => {
        if(currentActingDoctor.doctorType!='Assistant Consultant'){return [];}
        let newDocID=[];
        
        doctors.map((doc)=>{
            doc.doctorType=='Consultant'? newDocID=[...newDocID,...doc.doctorRequests]:null;
        });

        return doctors.filter((doc)=>{
            let f=newDocID.findIndex(docidx=> doc.doctorID===docidx);
            return f!=-1?true:false
        });

    };



    /**
     * @param {string} fullname: fullname should be separated by space. forexample, 'Amin Morshed' Amin is lastName and Morshed is firstName
     * 
     */
    this.removeDoctorFromTeam = (fullname) => {
        const [lastName, firstName] = fullname.split(' ');
        let docIdx = doctors.findIndex(doc => doc.firstName === firstName && doc.lastName == lastName);

        if (docIdx === -1) {
            return;
        }

        // disable doctor account.

        doctors[docIdx] = { ...doctors[docIdx], active:false }

   

        let teamIDX = team.findIndex(t => t.teamID === doctors[docIdx].teamID);

        // Remove doctor from the team,

        team[teamIDX] = { ...team[teamIDX], teamMates: team[teamIDX].teamMates.filter(docID => docID != doctors[docIdx].doctorID) };

    }

    /**
     * 
     * @param {number} doctorID : Doctor ID in doctorRequests list 
     * @returns 
     */

    this.approveDoctor = (doctorID,currentActingDoctor) => {

        if(currentActingDoctor.doctorType!=='Consultant'){return;}

        let doctorIDX = doctors.findIndex(doc => doc.doctorID === doctorID);

        if (doctorIDX === -1) {
            return;
        }

        // remove doctor from item from doctorRequests
        doctors.find((doc)=>{
            if(doc.doctorType==='Consultant'){
                let idx=doc.doctorRequests.findIndex(docID=> docID===doctors[doctorIDX].doctorID);

                if(idx!==-1){
                
                    doc.doctorRequests=[...doc.doctorRequests.filter((_,i)=>i!==idx)];
                    return true;
                }

            }
            return false
        });
      
    
        

        


        // search for team 
        let teamIDX = team.findIndex(t => t.teamID === doctors[doctorIDX].teamID);

        // checking current acting doctor is a consultantInCharge for the team 
        if (teamIDX !== -1 && team[teamIDX].consultantInCharge==currentActingDoctor.doctorID) {


                // update doctor status to active 
                doctors[doctorIDX]={...doctors[doctorIDX],active:true};

                // add to team 
                team[teamIDX]={
                    ...team[teamIDX],
                    teamMates:[
                        ...team[teamIDX].teamMates,
                        doctors[doctorIDX].doctorID
                    ]
                };
            
                
        }

    }




}


console.log('**************doctor part*******************');
const doctor = new Doctor();

let ConsultantDoctor=doctor.listOfDoctor()[0];
let AssistantConsultant=doctor.listOfDoctor()[1];
// console.log(doctor.promoteNewDoctor());

console.log(' Adding Amin Morshed  ');
// Add a new doctor with the doctorType `RMO`
let doctorID = doctor.addDoctor('Morshed', 'Amin', 'RMO');

// the new doctor team `008`
doctor.addTeam(doctorID, '008',ConsultantDoctor);

console.log('Promote the new doctor  ');
//  Promote the new doctor  
console.log(doctor.promoteNewDoctor(AssistantConsultant));

// if consultantInCharge approve requested Doctor 
// then
doctor.approveDoctor(doctorID,ConsultantDoctor);
console.log('After approve ');
// displaying result
console.log('Doctors list');
console.log(doctor.listOfDoctor());

console.log('recruited doctors list');
console.log(doctor.promoteNewDoctor(AssistantConsultant));

console.log('Team list');
console.log(doctor.listOfTeams());


console.log(' Remove Amin Morshed from the team ');
// Remove Amin Morshed from the team, and disable his account
doctor.removeDoctorFromTeam('Amin Morshed');



// displaying result
console.log('Doctors list');
console.log(doctor.listOfDoctor());

console.log('Team list');
console.log(doctor.listOfTeams());


console.log('recruited doctors list');
console.log(doctor.promoteNewDoctor(AssistantConsultant));


console.log('**************doctor part end*******************');



