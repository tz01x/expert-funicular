

export function Doctor() {

    const doctors = [{
        doctorID: 0,
        team: '',
        teamID: 0,
        doctorTypes: 'consultant',
        firstName: '',
        lastName: '',
        email: "",
        status: 'active',

    }];
    let lastDoctorID = 0;
    let lastTeamID = 0;

    const teamMates = [
        {
            teamID: 0,
            team: '',
            members: [],//members list only store doctorID

        }
    ];

    const doctorRequests = [];



    /**
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} doctorTypes
     * @returns {number} doctorID:  of newdly added doctor to doctorRequests list 
     */
    this.addDoctor = (firstName, lastName, doctorTypes) => {


        let email = firstName.slice(0, 2) + lastName.slice(-4, -1) + "@doc.com";
        let doctorID = lastDoctorID + 1;
        const doc = {
            doctorID,
            firstName,
            lastName,
            doctorTypes,
            email,
            status: 'deactive',
        }

        lastDoctorID += 1;

        doctorRequests.push(doc);
        return doctorID;

    }

    /**
     * @param {number} doctorID : doctorID
     * @param {string} team : team name
     */
    this.addTeam = (doctorID, team) => {


        let idx = doctorRequests.findIndex((rdoc) => rdoc.doctorID === doctorID);
        if (idx != -1) {
            doctorRequests[idx] = { ...doctorRequests[idx], team };
        }

    }
    this.listOfDoctor = () => [...doctors];
    // this.listOfDoctorRequests=()=>[...doctorRequests];
    

    /**@returns {Array} DoctorRequested list*/
    this.promoteNewDoctor = () => [...doctorRequests];

    /**@returns {Array} teamMates list */
    this.listOfteamMates = () => [...teamMates];

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

        doctors[docIdx] = { ...doctors[docIdx], status: 'deactive' }

        let teamID = doctors[docIdx].teamID;

        let teamMateidx = teamMates.findIndex(t => t.teamID === teamID);

        // Remove doctor from the team,

        teamMates[teamMateidx] = { ...teamMates[teamMateidx], members: teamMates[teamMateidx].members.filter(docID => docID != doctors[docIdx].doctorID) };

    }

    /**
     * 
     * @param {number} doctorID : Doctor ID in doctorRequests list 
     * @returns 
     */

    this.approveDoctor = (doctorID) => {

        let doctorRequestsIDX = doctorRequests.findIndex(doc => doc.doctorID === doctorID);

        if (doctorRequestsIDX == -1) {
            return;
        }

        let doctor = doctorRequests[doctorRequestsIDX];
        if (doctor == null || doctor == undefined) {
            return;
        }
        // remove index item from doctorRequests

        doctorRequests.splice(doctorRequestsIDX, 1);


        // search for team 
        let teamMateIdx = teamMates.findIndex(t => t.team === doctor.team);
        // if there is no team create team 
        if (teamMateIdx == -1) {

            teamMates.push({ team: doctor.team, members: [doctor.doctorID], teamID: lastTeamID + 1 });

            lastTeamID += 1;
        } else {

            // add to doctorID to team.member list 

            teamMates[teamMateIdx] = { ...teamMates[teamMateIdx], members: [...teamMates[teamMateIdx].members, doctor.doctorID] };

        }



        // update doctor status to active 

        doctor.teamID = lastTeamID;

        //  add Doc to doctors list 

        doctors.push(doctor);





    }




}


console.log('**************doctor part*******************');
const doctor = new Doctor();

console.log(doctor.listOfDoctor());
// console.log(doctor.promoteNewDoctor());


// Add a new doctor with the doctorType `RMO`
let doctorID = doctor.addDoctor('Morshed', 'Amin', 'RMO');

// the new doctor team `008`
doctor.addTeam(doctorID, '008');

//  Promote the new doctor  
console.log(doctor.promoteNewDoctor());

// if consultantInCharge approve requested Doctor 
// then
doctor.approveDoctor(doctorID);

// displaying result
console.log('doctors list');
console.log(doctor.listOfDoctor());

console.log('recruited doctors list');
console.log(doctor.promoteNewDoctor());

console.log('temsMembers list');
console.log(doctor.listOfteamMates());

// Remove Amin Morshed from the team, and disable his account
doctor.removeDoctorFromTeam('Amin Morshed');



// displaying result
console.log('doctors list');
console.log(doctor.listOfDoctor());

console.log('recruited doctors list');
console.log(doctor.promoteNewDoctor());

console.log('temsMembers list');
console.log(doctor.listOfteamMates());
console.log('**************doctor part end*******************');



