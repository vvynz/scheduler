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

