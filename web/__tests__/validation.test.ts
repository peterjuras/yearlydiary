import { addDays } from "date-fns";
import {
  validateAnswer,
  validateDay,
  validateMonth,
  validateOffset,
  validatePostDate,
  validatePublicPosts,
  validateUserId,
  validateYear,
} from "../lib/server/validation";

describe("validation", () => {
  describe("day", () => {
    test("returns no issues for correct values", () => {
      const validDays = Array(31)
        .fill(1)
        .map((_, index) => `${index + 1}`);

      for (const day of validDays) {
        expect([...validateDay(day)]).toHaveLength(0);
      }
    });

    test.each`
      typeDescription | value
      ${"Boolean"}    | ${true}
      ${"Null"}       | ${null}
      ${"Undefined"}  | ${undefined}
      ${"String"}     | ${"maximum"}
      ${"Object"}     | ${{}}
      ${"Array"}      | ${[]}
    `(
      "should return an issue for non-numeric values - $typeDescription",
      ({ value }) => {
        const issues = [...validateDay(value)];

        expect(issues).toHaveLength(1);
        expect(issues[0]).toBe("day must be an integer.");
      },
    );

    test("should return an issue if too low", () => {
      const issues = [...validateDay("0")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("day must be between 1 and 31.");
    });

    test("should return an issue if too high", () => {
      const issues = [...validateDay("32")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("day must be between 1 and 31.");
    });
  });

  describe("month", () => {
    test("returns no issues for correct values", () => {
      const validMonths = Array(12)
        .fill(1)
        .map((_, index) => `${index}`);

      for (const month of validMonths) {
        expect([...validateMonth(month)]).toHaveLength(0);
      }
    });

    test.each`
      typeDescription | value
      ${"Boolean"}    | ${true}
      ${"Null"}       | ${null}
      ${"Undefined"}  | ${undefined}
      ${"String"}     | ${"maximum"}
      ${"Object"}     | ${{}}
      ${"Array"}      | ${[]}
    `(
      "should return an issue for non-numeric values - $typeDescription",
      ({ value }) => {
        const issues = [...validateMonth(value)];

        expect(issues).toHaveLength(1);
        expect(issues[0]).toBe("month must be an integer.");
      },
    );

    test("should return an issue if too low", () => {
      const issues = [...validateMonth("-1")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("month must be between 0 and 11.");
    });

    test("should return an issue if too high", () => {
      const issues = [...validateMonth("12")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("month must be between 0 and 11.");
    });
  });

  describe("year", () => {
    test("should return no issues for a correct value", () => {
      const issues = [...validateYear("2022")];

      expect(issues).toHaveLength(0);
    });

    test.each`
      typeDescription | value
      ${"Boolean"}    | ${true}
      ${"Null"}       | ${null}
      ${"Undefined"}  | ${undefined}
      ${"String"}     | ${"maximum"}
      ${"Object"}     | ${{}}
      ${"Array"}      | ${[]}
    `(
      "should return an issue for non-numeric values - $typeDescription",
      ({ value }) => {
        const issues = [...validateYear(value)];

        expect(issues).toHaveLength(1);
        expect(issues[0]).toBe("year must be an integer.");
      },
    );

    test("should return an issue if too low", () => {
      const issues = [...validateYear("2021")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("year must be higher than 2021.");
    });
  });

  describe("offset", () => {
    test("should return no issues for a correct value", () => {
      const issues = [...validateOffset("0")];

      expect(issues).toHaveLength(0);
    });

    test("should allow undefined values", () => {
      const issues = [...validateOffset(undefined)];

      expect(issues).toHaveLength(0);
    });

    test.each`
      typeDescription | value
      ${"Boolean"}    | ${true}
      ${"Null"}       | ${null}
      ${"String"}     | ${"maximum"}
      ${"Object"}     | ${{}}
      ${"Array"}      | ${[]}
    `(
      "should return an issue for non-numeric values - $typeDescription",
      ({ value }) => {
        const issues = [...validateOffset(value)];

        expect(issues).toHaveLength(1);
        expect(issues[0]).toBe("offset must be an integer.");
      },
    );

    test("should return an issue if too low", () => {
      const issues = [...validateOffset("-1")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("offset must be positive.");
    });
  });

  describe("userId", () => {
    test("should return no issues for a correct value", () => {
      const issues = [
        ...validateUserId("1903844f-c3a7-45b7-aee9-69239d611334"),
      ];

      expect(issues).toHaveLength(0);
    });

    test.each`
      typeDescription | value
      ${"Boolean"}    | ${true}
      ${"Null"}       | ${null}
      ${"Undefined"}  | ${undefined}
      ${"Number"}     | ${1821}
      ${"Object"}     | ${{}}
      ${"Array"}      | ${[]}
    `(
      "should return an issue for non-string values - $typeDescription",
      ({ value }) => {
        const issues = [...validateUserId(value)];

        expect(issues).toHaveLength(1);
        expect(issues[0]).toBe("userId must be a string.");
      },
    );

    test("should return an issue if it's an empty string", () => {
      const issues = [...validateUserId("")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("userId must be a non-empty string.");
    });

    test("should return an issue if it's too long", () => {
      const issues = [...validateUserId("A".repeat(101))];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("Invalid userId.");
    });
  });

  describe("answer", () => {
    test("should return no issues for a correct value", () => {
      const issues = [
        ...validateAnswer("I ate something big for breakfast!\nAnd you?"),
      ];

      expect(issues).toHaveLength(0);
    });

    test.each`
      typeDescription | value
      ${"Boolean"}    | ${true}
      ${"Null"}       | ${null}
      ${"Undefined"}  | ${undefined}
      ${"Number"}     | ${1821}
      ${"Object"}     | ${{}}
      ${"Array"}      | ${[]}
    `(
      "should return an issue for non-string values - $typeDescription",
      ({ value }) => {
        const issues = [...validateAnswer(value)];

        expect(issues).toHaveLength(1);
        expect(issues[0]).toBe("answer must be a string.");
      },
    );

    test("should return an issue if it's an empty string", () => {
      const issues = [...validateAnswer("")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("answer must be a non-empty string.");
    });

    test("should return an issue if it's only whitespace", () => {
      const issues = [...validateAnswer("     ")];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("answer must be a non-empty string.");
    });

    test("should return an issue if it's too long", () => {
      const issues = [...validateAnswer("A".repeat(1001))];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("answer must not be longer than 1000 characters.");
    });
  });

  describe("publicPosts", () => {
    test("should return no issues for a correct value", () => {
      const issues = [
        ...validatePublicPosts(false),
        ...validatePublicPosts(true),
      ];

      expect(issues).toHaveLength(0);
    });

    test.each`
      typeDescription | value
      ${"Null"}       | ${null}
      ${"Undefined"}  | ${undefined}
      ${"Number"}     | ${1821}
      ${"String"}     | ${"true"}
      ${"Object"}     | ${{}}
      ${"Array"}      | ${[]}
    `(
      "should return an issue for non-boolean values - $typeDescription",
      ({ value }) => {
        const issues = [...validatePublicPosts(value)];

        expect(issues).toHaveLength(1);
        expect(issues[0]).toBe("publicPosts must be a boolean.");
      },
    );
  });

  describe("postDate", () => {
    test("should return no issues for a post on the same day", () => {
      const today = new Date();
      const postYear = today.getFullYear();
      const postMonth = today.getMonth();
      const postDay = today.getDate();

      const issues = [...validatePostDate(today, postYear, postMonth, postDay)];
      expect(issues).toHaveLength(0);
    });

    test("should return no issues for a post for yesterday", () => {
      const today = new Date();
      const postDate = addDays(today, -1);
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth();
      const postDay = postDate.getDate();

      const issues = [...validatePostDate(today, postYear, postMonth, postDay)];
      expect(issues).toHaveLength(0);
    });

    test("should return no issues for a post for tomorrrow", () => {
      const today = new Date();
      const postDate = addDays(today, 1);
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth();
      const postDay = postDate.getDate();

      const issues = [...validatePostDate(today, postYear, postMonth, postDay)];
      expect(issues).toHaveLength(0);
    });

    test("should return no issues for a post for Dec 31 as yesterday", () => {
      const today = new Date();
      today.setFullYear(2022);
      today.setDate(1);
      today.setMonth(0);

      const postYear = 2021;
      const postMonth = 11;
      const postDay = 31;

      const issues = [...validatePostDate(today, postYear, postMonth, postDay)];
      expect(issues).toHaveLength(0);
    });

    describe("Feb 29", () => {
      test("should return no issues for a post on Feb 29", () => {
        const today = new Date();
        today.setFullYear(2020);
        today.setDate(29);
        today.setMonth(1);

        const postYear = 2020;
        const postMonth = 1;
        const postDay = 29;

        const issues = [
          ...validatePostDate(today, postYear, postMonth, postDay),
        ];
        expect(issues).toHaveLength(0);
      });

      test("should return no issues for a post for Feb 28", () => {
        const today = new Date();
        today.setFullYear(2020);
        today.setDate(29);
        today.setMonth(1);

        const postYear = 2020;
        const postMonth = 1;
        const postDay = 28;

        const issues = [
          ...validatePostDate(today, postYear, postMonth, postDay),
        ];
        expect(issues).toHaveLength(0);
      });

      test("should return no issues for a post for Mar 1", () => {
        const today = new Date();
        today.setFullYear(2020);
        today.setDate(29);
        today.setMonth(1);

        const postYear = 2020;
        const postMonth = 2;
        const postDay = 1;

        const issues = [
          ...validatePostDate(today, postYear, postMonth, postDay),
        ];
        expect(issues).toHaveLength(0);
      });
    });

    test("should return an issue for the day after tomorrow", () => {
      const today = new Date();
      const postDate = addDays(today, 2);
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth();
      const postDay = postDate.getDate();

      const issues = [...validatePostDate(today, postYear, postMonth, postDay)];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("You can only submit a post for today.");
    });

    test("should return an issue for the day before yesterday", () => {
      const today = new Date();
      const postDate = addDays(today, -2);
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth();
      const postDay = postDate.getDate();

      const issues = [...validatePostDate(today, postYear, postMonth, postDay)];

      expect(issues).toHaveLength(1);
      expect(issues[0]).toBe("You can only submit a post for today.");
    });
  });
});
