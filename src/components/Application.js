import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import getAppointmentsForDay from 'helpers/selectors';

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  // Promise.all will make GET requests to /days & /appointments
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments')
  ]).then((all) => {
    setState(prev => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data
    }));
  })

  // our array of appointments returned from our helper function
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsArr = dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)


  useEffect(() => {
    axios.get('/api/days').then(response => {
      // console.log(response.data);
      // setDays([...response.data]);
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
        {appointmentsArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
