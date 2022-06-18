import { addDays } from "date-fns";

export function* validateDay(day: string | string[]): Generator<string> {
  if (Array.isArray(day)) {
    yield "day must be an integer.";
    return;
  }

  const parsedDay = parseInt(day);

  if (!Number.isInteger(parsedDay)) {
    yield "day must be an integer.";
  }

  if (parsedDay < 1 || parsedDay > 31) {
    yield "day must be between 1 and 31.";
  }
}

export function* validateMonth(month: string | string[]): Generator<string> {
  if (Array.isArray(month)) {
    yield "month must be an integer.";
    return;
  }
  const parsedMonth = parseInt(month);

  if (!Number.isInteger(parsedMonth)) {
    yield "month must be an integer.";
  }

  if (parsedMonth < 0 || parsedMonth > 11) {
    yield "month must be between 0 and 11.";
  }
}

export function* validateYear(year: string | string[]): Generator<string> {
  if (Array.isArray(year)) {
    yield "year must be an integer.";
    return;
  }
  const parsedYear = parseInt(year);

  if (!Number.isInteger(parsedYear)) {
    yield "year must be an integer.";
  }

  if (parsedYear < 2022) {
    yield "year must be higher than 2021.";
  }
}

/**
 * Validates that a post can only be submitted for "today".
 * The implementation is quite generous, to allow multiple timezones.
 */
export function* validatePostDate(
  today: Date,
  year: number,
  month: number,
  day: number
): Generator<string> {
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);

  // Allow posts for today, yesterday & tomorrow
  const validDates = new Set([
    `${today.getFullYear()}${today.getMonth()}${today.getDate()}`,
    `${yesterday.getFullYear()}${yesterday.getMonth()}${yesterday.getDate()}`,
    `${tomorrow.getFullYear()}${tomorrow.getMonth()}${tomorrow.getDate()}`,
  ]);

  const postDate = `${year}${month}${day}`;

  if (!validDates.has(postDate)) {
    yield "You can only submit a post for today.";
  }
}

export function* validateOffset(
  offset: string | string[] | undefined
): Generator<string> {
  if (typeof offset === "undefined") {
    return;
  }
  if (Array.isArray(offset)) {
    yield "offset must be an integer.";
    return;
  }

  const parsedOffset = parseInt(offset);

  if (!Number.isInteger(parsedOffset)) {
    yield "offset must be an integer.";
  }

  if (parsedOffset < 0) {
    yield "offset must be positive.";
  }
}

export function* validateUserId(userId: string | string[]): Generator<string> {
  if (typeof userId !== "string") {
    yield "userId must be a string.";
    return;
  }

  if (!userId) {
    yield "userId must be a non-empty string.";
  }

  if (userId.length > 100) {
    yield "Invalid userId.";
  }
}

export function* validateAnswer(answer: string | string[]): Generator<string> {
  if (typeof answer !== "string") {
    yield "answer must be a string.";
    return;
  }

  if (!answer || !answer.trim()) {
    yield "answer must be a non-empty string.";
  }

  if (answer.length > 1000) {
    yield "answer must not be longer than 1000 characters.";
  }
}

export function* validatePublicPosts(publicPosts: boolean): Generator<string> {
  if (typeof publicPosts !== "boolean") {
    yield "publicPosts must be a boolean.";
  }
}
