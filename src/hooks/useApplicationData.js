const { useState, useEffect } = require("react");
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterviewersForDay
} from "../components/helper/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };
  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8001/api/ws");

    webSocket.addEventListener('open', () => {
    // Send "ping" to the server when the connection is open
    webSocket.send('ping');
  });
    webSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle incoming WebSocket messages
      // Update the state accordingly
      // For example:
      if (data.type === "appointments") {
        setState((prev) => ({
          ...prev,
          appointments: data.appointments
        }));
      }
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      webSocket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      const [daysResponse, appointmentsResponse, interviewersResponse] = all;
      setState((prev) => ({
        ...prev,
        days: daysResponse.data,
        appointments: appointmentsResponse.data,
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
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((response) => {
        if (response.status === 204) {
          // Update the state with the updated appointment data
          setState((prev) => {
            const updatedAppointments = {
              ...prev.appointments,
              [id]: appointment
            };

            const updatedDays = updateSpotsRemaining(prev.days, updatedAppointments);

            return {
              ...prev,
              appointments: updatedAppointments,
              days: updatedDays
            };
          });
          return true;
        } else {
          throw new Error("Failed to update appointment");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error if the request fails
        throw error; // Propagate the error to the caller
      });
  }

  function cancelInterview(id) {
    // Make the delete request using Axios
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        if (response.status === 204) {
          // Update the state with the cancelled appointment data
          setState((prev) => {
            const updatedAppointments = {
              ...prev.appointments,
              [id]: {
                ...prev.appointments[id],
                interview: null
              }
            };

            const updatedDays = updateSpotsRemaining(prev.days, updatedAppointments);

            return {
              ...prev,
              appointments: updatedAppointments,
              days: updatedDays
            };
          });

          return true;
        } else {
          throw new Error("Failed to cancel appointment");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error if the request fails
        throw error; // Propagate the error to the caller
      });
  }

  function updateSpotsRemaining(days, appointments) {
    return days.map((day) => {
      const spots = day.appointments.reduce((count, appointmentId) => {
        if (!appointments[appointmentId].interview) {
          return count + 1;
        }
        return count;
      }, 0);

      return {
        ...day,
        spots
      };
    });
  }

  const interviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    interviewers,
    dailyAppointments
  };
}
