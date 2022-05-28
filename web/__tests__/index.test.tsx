import { render, screen } from "@testing-library/react";
import Home from "../pages";

describe("Home", () => {
  it("renders the hello world text", () => {
    render(<Home />);

    const helloWorldText = screen.getByText("Hello Yearlydiary");

    expect(helloWorldText).toBeInTheDocument();
  });
});
