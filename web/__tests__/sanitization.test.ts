import {
  sanitizeAnswer,
  sanitizeDay,
  sanitizeMonth,
  sanitizeOffset,
  sanitizeUserId,
  sanitizeYear,
} from "../lib/server/sanitization";

describe("sanitization", () => {
  describe("day", () => {
    test("should return a parsed number", () => {
      expect(sanitizeDay("6")).toBe(6);
    });

    test("should cut off decimals from non-integer values", () => {
      expect(sanitizeDay("6.912")).toBe(6);
    });
  });

  describe("month", () => {
    test("should return a parsed number", () => {
      expect(sanitizeMonth("6")).toBe(6);
    });

    test("should cut off decimals from non-integer values", () => {
      expect(sanitizeMonth("6.912")).toBe(6);
    });
  });

  describe("year", () => {
    test("should return a parsed number", () => {
      expect(sanitizeYear("6")).toBe(6);
    });

    test("should cut off decimals from non-integer values", () => {
      expect(sanitizeYear("6.912")).toBe(6);
    });
  });

  describe("offset", () => {
    test("should return a parsed number", () => {
      expect(sanitizeOffset("6")).toBe(6);
    });

    test("should return 0 if offset is undefined", () => {
      expect(sanitizeOffset(undefined)).toBe(0);
    });

    test("should cut off decimals from non-integer values", () => {
      expect(sanitizeOffset("6.912")).toBe(6);
    });
  });

  describe("userId", () => {
    test("should turn userId to lower case", () => {
      expect(sanitizeUserId("1903844F-C3A7-45B7-AEE9-69239D611334")).toBe(
        "1903844f-c3a7-45b7-aee9-69239d611334"
      );
    });

    test("should not trim userId", () => {
      expect(sanitizeUserId("  1903844f-c3a7-45b7-aee9-69239d611334  ")).toBe(
        "  1903844f-c3a7-45b7-aee9-69239d611334  "
      );
    });
  });

  describe("answer", () => {
    test("should trim each line of the answer", () => {
      expect(
        sanitizeAnswer("  Hi here is my answer!\n  \n How are you?  ")
      ).toBe("Hi here is my answer!\n\nHow are you?");
    });
  });
});
