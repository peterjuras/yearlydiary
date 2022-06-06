import { render, screen } from "@testing-library/react";
import Day from "../pages/diary/[month]/[day]";

describe("Home Page", () => {
  beforeAll(() => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();

    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockReturnValue({ query: { month, day }, isReady: true });
  });

  it("renders the current date", async () => {
    const container = render(<Day />);

    const currentDate = new Intl.DateTimeFormat(undefined, {
      month: "numeric",
      day: "numeric",
    }).format(new Date());

    const dateElement = screen.getByText(currentDate);

    expect(dateElement).toBeInTheDocument();

    container.unmount();
  });
});
