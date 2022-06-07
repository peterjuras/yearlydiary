export function sanitizeDay(day: string): number {
  return parseInt(day);
}

export function sanitizeMonth(month: string): number {
  return parseInt(month);
}

export function sanitizeYear(year: string): number {
  return parseInt(year);
}

export function sanitizeOffset(offset: string | undefined): number {
  if (typeof offset === "undefined") {
    return 0;
  }

  return parseInt(offset);
}

export function sanitizeUserId(userId: string): string {
  return userId.toLowerCase();
}

export function sanitizeAnswer(answer: string): string {
  return answer
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}
