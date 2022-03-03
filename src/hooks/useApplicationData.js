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
  const updateSpots = (state, appointments, day) => {
    // finds the selected day's object
    const selectedDay = state.days.find(date => date.name === day);
    const apptsForDay = selectedDay.appointments;

    // filter through the selectDay's appointments to find the null interview objects
    const spotsRemaining = apptsForDay.filter(appt =>
      appointments[appt].interview === null).length;

    return spotsRemaining;
  }

  // makes a PUT request to make a new appointment
  const bookInterview = (id, interview) => {
    // alert("HELLO");

    // new appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // update the appointments object with the new appointment obj
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spotsLeft = updateSpots(state, appointments, state.day);

    // map through the state days object to find the selected day and update that day's spots remaining
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: spotsLeft }
      }
      // if not the selected day, just return the day(don't want to modify it)
      return day;
    })

    // make PUT request to appintments/:id
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        // update the existing setState with the response
        setState({ ...state, appointments, days: days });
      })
      .catch(err => console.log(err))
  }

  // makes a DELETE request to cancel an appointment and updates out state object
  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const spotsLeft = updateSpots(state, appointments, state.day);
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: spotsLeft }
      }
      return day;
    })

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: days });
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