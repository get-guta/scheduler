import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import Application from "components/Application";
describe("Application", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<Application />);
    });
  });
});
