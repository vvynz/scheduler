// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };

export function getAppointmentsForDay(state, day) {
  //Returns an array of obj from state.days where the name matches the provided day
  let apptArr = [];

  const filteredDays = state.days.filter(date => {
    if (date.name === day) {
      // return date;

      const stateArr = Object.values(state.appointments);
      // console.log("OBJ???", stateArr);
      const apptObj = stateArr.map(appt => {
        // console.log("MEOW", appt.id);
        // console.log("APPTS??", date.appointments);

        for (const result of date.appointments) {
          // console.log(result);

          if (appt.id === result) {
            apptArr.push(appt);

          }
        }
      })
    }
  });
  // console.log("FINAL", apptArr);
  return apptArr;

}


// will receive the state obj and an interview object
export function getInterview(state, interview) {
  // console.log("INTERVIEW OBJ", state.appointments["3"].interview);

  let result = {};

  //retrieve an array of the interviewers obj from the state obj
  const interviewersArr = Object.values(state.interviewers);
  // console.log("ARRAY", interviewersArr);

  interviewersArr.map(interviewer => {
    // console.log(interviewer);

    if (interview === null) {
      result = null;
    } else if (interviewer.id === interview.interviewer) {
      result = {
        student: interview.student,
        interviewer
      };
    }
  })
  // should return a new obj that contains the interview data else, returns null
  // console.log("RESULT", result);
  return result;
}

