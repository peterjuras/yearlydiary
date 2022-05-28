import { act, render, screen } from "@testing-library/react";
import Home from "../pages";

describe("Home", () => {
  it("renders the current date", () => {
    render(<Home />);

    const currentDate = new Intl.DateTimeFormat().format(new Date());

    const dateElement = screen.getByText(currentDate);

    expect(dateElement).toBeInTheDocument();
  });
});
