import { addMinutes } from "date-fns";

export function generateCode(): string {
  const randomNumber = Math.floor(Math.random() * 10000);
  const paddedNumber = `${randomNumber}`.padStart(4, "0");
  return paddedNumber;
}

export function generateExpiryDate(): Date {
  const now = new Date();
  const expiryDate = addMinutes(now, 5);
  return expiryDate;
}
