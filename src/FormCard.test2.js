import { render } from "@testing-library/react";
import FormCard from "./FormCard";

describe("FormCardUnittests", () => {
  test.skip("it renders", () => {
    const { getByLabelText } = render(<FormCard />);
    getByLabelText("Date");
    getByLabelText(/^m/);
  });
});
