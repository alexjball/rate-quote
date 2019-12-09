import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { PropertyType, Occupancy } from "./RateQuoteClient";

// Use node-fetch as the fetch polyfill, rather than JSDom's browser polyfill.
// node-fetch supports the wildcard CORS headers the endpoint uses.
// https://github.com/jsdom/jsdom/issues/2408
import nodeFetch from "node-fetch";
window.fetch = nodeFetch;

test("renders a button to get quotes", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Quote Rates/);
  expect(linkElement).toBeInTheDocument();
});

test("fetches quotes and shows results", async () => {
  const {
    getByLabelText,
    queryByText,
    queryAllByText,
    getByText,
    findByText
  } = render(<App />);

  userEvent.type(getByLabelText("Loan Size"), "450000");
  userEvent.type(getByLabelText("Credit Score"), "680");
  userEvent.selectOptions(
    getByLabelText("Property Type"),
    PropertyType.MultiFamily
  );
  userEvent.selectOptions(getByLabelText("Occupancy"), Occupancy.Investment);

  // No result table
  expect(queryByText("Closing Costs")).toBeNull();

  // Search for quotes
  getByText("Quote Rates").click();

  // Table appears
  await expect(findByText("Closing Costs")).resolves.toBeTruthy();
  expect(queryAllByText("TFB Federal Credit Union")).toHaveLength(3);
  expect(queryAllByText(/\$2555/)).not.toHaveLength(0);
  expect(queryAllByText(/\$6150/)).not.toHaveLength(0);
  expect(queryAllByText(/5.623\%/)).not.toHaveLength(0);
});
