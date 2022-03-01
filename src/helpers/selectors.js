// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [2]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [1, 2]
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

  const dayObj = state.days.find(date => date.name === day);
  if (!dayObj) {
    return [];
  }

  let apptArr = [];

  for (const id of dayObj.appointments) {
    const appointment = state.appointments[id];
    apptArr.push(appointment);
  }

  return apptArr;

}


// will receive the state obj and an interview object
export function getInterview(state, interview) {
  // console.log("INTERVIEW OBJ", state.appointments["3"].interview);

  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  const newInterview = { ...interview, interviewer };

  return newInterview;

}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(date => date.name === day);
  if (!dayObj) {
    return [];
  }

  let results = [];

  for (const id of dayObj.interviewers) {
    const interview = state.interviewers[id];
    results.push(interview);
  }

  return results;

}

