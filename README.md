# Interview Scheduler React Application

Scheduler is a react based web application that allows users to schedule appointments with interviewers. It provides a user-friendly interface for managing appointments, interviewers, and available time slots.

## Features

- View a weekly schedule with available time slots
- Book appointments with interviewers
- Edit or cancel existing appointments
- Real-time updating of available spots
- Responsive design for seamless usage on desktop and mobile devices

## Technologies Used

- React: JavaScript library for building user interfaces
- Axios: Promise-based HTTP client for making API requests
- SCSS: CSS preprocessor for styling
- WebSocket: Real-time communication for updates
- Jest: JavaScript testing framework for unit and integration tests

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository for Scheduler Client & API:

   ```bash
   git clone https://github.com/get-guta/scheduler.git

   git clone https://github.com/get-guta/scheduler-api.git

## Setup
Navigate to the project directory for each:

Install dependencies with `npm install`.

N.B: Run scheduler web app & scheduler-api separately.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Tests Covered
The Scheduler application includes the following tests:

### End-to-end Integration tests for:

- Default day selection and changing the schedule
- Loading data, booking an appointment, and reducing spots remaining
- Loading data, canceling an appointment, and increasing spots remaining
- Loading data, editing an interview, and keeping spots remaining the same
- Error handling for saving and deleting appointments

### Unit tests for components:
- Form component
- DayList component
- DayListItem component
- Appointment component
- Application component

## Test Coverage
The test coverage report can be generated using the following command
```sh
npm test -- --coverage --watchAll=false
```
The coverage report will be generated in the coverage directory.
## Screenshots
### View Appointment
!["Show mode. Display booked & open slots"](/public/screenshots/show.png)
### Edit Appointment
!["Edit mode. Edit Appointment"](/public/screenshots/edit.png)

### Delete Appointment
!["Delete mode. Delete Appointment"](/public/screenshots/delete.png)

### Create Appointment
!["Empty mode. Add new appointment to open slot"](/public/screenshots/create.png)

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please submit an issue or a pull request.