import React from "react";
import { render } from "@testing-library/react";
import FormCard from "./FormCard";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("FormCardUnitTests", () => {
  const history = createMemoryHistory();
  it("renders the form to add", () => {
    history.push("/add");
    const { getByLabelText, getByText } = render(<RouterWrappedFormCard />);
    getByLabelText("Date");
    getByLabelText(/^m/);
    getByText("Add");
  });

  it("renders the form to edit", () => {
    history.push(
      "/edit?" +
        new URLSearchParams([
          ["date", "2000-01-01"],
          ["m3", 100]
        ]).toString()
    );
    const { getByLabelText, getByText } = render(<RouterWrappedFormCard />);
    getByLabelText("Date");
    getByLabelText(/^m/);
    getByText("Edit");
  });

  function RouterWrappedFormCard() {
    return (
      <Router history={history}>
        <FormCard />
      </Router>
    );
  }
});
