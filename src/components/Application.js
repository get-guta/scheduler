import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "./helper/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => {

    setState((prev) => ({ ...prev, day }));

  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      const [daysResponse, dailyAppointments, interviewersResponse] = all;
      setState((prev) => ({
        ...prev,
        days: daysResponse.data,
        appointments: dailyAppointments.data,
        interviewers: interviewersResponse.data
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    // Return the promise
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((response) => {
        if (response.status === 204) {
          // Update the state with the updated appointment data
          setState({
            ...state,
            appointments
          });
          return true;
        } else {
          throw new Error('Failed to update appointment');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error if the request fails
        throw error; // Propagate the error to the caller
      });
  }

  function cancelInterview(id) {
    // Make the put request using Axios
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        if (response.status === 204) {
          // Update the state with the cancelled appointment data
          setState(prev => ({
            ...prev,
            appointments: {
              ...prev.appointments,
              [id]: {
                ...prev.appointments[id],
                interview: null
              }
            }
          }));
          
          return true;
        } else {
          throw new Error('Failed to cancel appointment');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error if the request fails
      });
  }

  

  // Move the schedule mapping outside of the JSX block
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });



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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
