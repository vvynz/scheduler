import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from 'helpers/selectors';

export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

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

    // make PUT request to appintments/:id
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        // console.log(res);
        // update the existing setState with the response
        setState({ ...state, appointments });
      })
      .catch(err => console.log(err))
  }

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

  // our array of appointments returned from our helper function
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewers} bookInterview={bookInterview} cancelInterview={cancelInterview} />
    )
  })


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


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
