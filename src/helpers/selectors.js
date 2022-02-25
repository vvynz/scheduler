export default function getAppointmentsForDay(state, day) {
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

// getAppointmentsForDay(state, "Wednesday");