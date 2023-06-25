import React from "react";
import {
  render, waitForElement,
  fireEvent, prettyDOM,
  getByText, getAllByTestId,
  getByAltText, getByPlaceholderText,
  queryByText
} from "@testing-library/react";
import { act } from "react-dom/test-utils"; // import act from react-dom/test-utils

import Application from "components/Application";
jest.mock('axios');

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // Render the Application.
    const { container, debug } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get all appointments
    const appointments = getAllByTestId(container, "appointment");
    // Select the first appointment
    const appointment = appointments[0];

    // Simulate a click on the "Add" button of the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Change the name of the student in the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click on the first interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Simulate a click on the "Save" button.
    fireEvent.click(getByText(appointment, "Save"));

    // Verify that the appointment element contains the text "Saving" immediately after the "Save" button is clicked.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Use the `waitForElement` function to wait for the element containing "Lydia Miller-Jones" to appear.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Select the day node that contains the text "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    //  checking that the day with the text "Monday" also has the text "no spots remaining"
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });


});
