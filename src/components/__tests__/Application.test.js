import React from "react";
import {
  render, waitForElement,
  fireEvent, prettyDOM,
  getByText, getAllByTestId,
  getByAltText, getByPlaceholderText
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
    const { container } = render(<Application />);
  
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
  
    // Wrap the click event inside an act to ensure all updates are processed
    await act(async () => {
      // Simulate a click on the "Save" button.
      fireEvent.click(getByText(appointment, "Save"));
    });
  
    // Log the DOM element to the console
    console.log(prettyDOM(appointment));
  });
  
});
