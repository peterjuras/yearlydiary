import { questions } from "../../lib-server/questions";

describe("#questions", () => {
  test.each`
    monthText      | month | expectedDays
    ${"January"}   | ${0}  | ${31}
    ${"February"}  | ${1}  | ${29}
    ${"March"}     | ${2}  | ${31}
    ${"April"}     | ${3}  | ${30}
    ${"May"}       | ${4}  | ${31}
    ${"June"}      | ${5}  | ${30}
    ${"July"}      | ${6}  | ${31}
    ${"August"}    | ${7}  | ${31}
    ${"September"} | ${8}  | ${30}
    ${"October"}   | ${9}  | ${31}
    ${"November"}  | ${10} | ${30}
    ${"December"}  | ${11} | ${31}
  `(
    "$monthText should have $expectedDays days",
    ({ month, expectedDays }: { month: number; expectedDays: number }) => {
      const questionsForMonth = questions[month];

      for (let i = 1; i <= expectedDays; i++) {
        expect(questionsForMonth[i]).toBeTruthy();
      }
    }
  );
});
