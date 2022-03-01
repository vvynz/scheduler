import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // function that sets the current day
  const setDay = day => setState({ ...state, day });

  // a function that finds the number of interview spots remaining for a selected day
  const updateSpots = (state, day) => {
    // finds the selected day's object
    const selectedDay = state.days.find(date => date.name === day);
    const apptsForDay = selectedDay.appointments;

    // filter through the selectDay's appointments to find the null interview objects
    const spotsRemaining = apptsForDay.filter(appt =>
      state.appointments[appt].interview === null).length;

    return spotsRemaining;
  }

  // makes a PUT request to make a new appointment
  const bookInterview = (id, interview) => {
    // alert("HELLO");
    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spotsRemaining = updateSpots(state, state.day);
    console.log("SPOTS REMAINING??", spotsRemaining);
    // make PUT request to appintments/:id
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        // console.log(res);
        // update the existing setState with the response
        setState({ ...state, appointments });
      })
      .catch(err => console.log(err))
  }

  // makes a DELETE request to cancel an appointment and updates out state object
  const cancelInterview = (id) => {
    // alert(id);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
      interview: null
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // console.log("RES??", res);
        setState({ ...state, appointments });
      })
  }


  useEffect(() => {

    // Promise.all will make GET requests to /days & /appointments
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {

      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview };
}