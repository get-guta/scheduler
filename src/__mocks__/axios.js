const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 }
    },
    "4": { id: 4, time: "3pm", interview: null }
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    }
  }
};

export default {
  get: jest.fn(url => {
    return new Promise((resolve, reject) => {
      if (url === "http://localhost:8001/api/days") {
        resolve({
          status: 200,
          statusText: "OK",
          data: fixtures.days
        });
      } else if (url === "http://localhost:8001/api/appointments") {
        resolve({
          status: 200,
          statusText: "OK",
          data: fixtures.appointments
        });
      } else if (url === "http://localhost:8001/api/interviewers") {
        resolve({
          status: 200,
          statusText: "OK",
          data: fixtures.interviewers
        });
      } else {
        console.log(url);
        reject({
          status: 404,
          statusText: "Not Found",
          data: "API Endpoint not found"
        });
      }
    });
  }),
  put: jest.fn((url, data) => {
    return new Promise((resolve, reject) => {
      if (url.includes("http://localhost:8001/api/appointments")) {
        resolve({
          status: 204,
          statusText: "No Content"
        });
      } else {
        console.log(url);
        reject({
          status: 404,
          statusText: "Not Found",
          data: "API Endpoint not found"
        });
      }
    });
  })
}