import { cookies } from "next/headers";
import { Suspense } from "react";
import { getPostDatesForUser } from "../../lib/server/db";
import Calendar from "./Calendar";

export default function CalendarDataProvider() {
  const userId = cookies().get("userId")?.value;

  if (!userId) {
    return <Calendar />;
  }

  const postDatesPromise = getPostDatesForUser(userId);

  return (
    <Suspense fallback={<Calendar />}>
      <Calendar postDatesPromise={postDatesPromise} />
    </Suspense>
  );
}
