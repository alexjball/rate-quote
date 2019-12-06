import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders a button to get quotes", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Quote Rates/);
  expect(linkElement).toBeInTheDocument();
});
